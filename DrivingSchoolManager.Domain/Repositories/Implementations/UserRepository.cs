using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using DrivingSchoolManager.Data.Entities;
using DrivingSchoolManager.Data.Entities.Models;
using DrivingSchoolManager.Data.Enums;
using DrivingSchoolManager.Domain.Classes;
using DrivingSchoolManager.Domain.Helpers;
using DrivingSchoolManager.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Role = DrivingSchoolManager.Data.Enums.Role;

namespace DrivingSchoolManager.Domain.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        public UserRepository(DrivingSchoolManagerContext context, EmailHelper emailHelper, IFileUploadRepository fileUploadRepository)
        {
            _context = context;
            _helper = emailHelper;
            _fileUploadRepository = fileUploadRepository;
        }
        private readonly DrivingSchoolManagerContext _context;
        private readonly EmailHelper _helper;
        private readonly IFileUploadRepository _fileUploadRepository;


        public UserPagination GetByRole(int roleAsInt, int userId, int limit, int offset)
        {
            var user = _context.Users.Include(user => user.DrivingSchool).Include(user => user.Group).FirstOrDefault(user => user.Id == userId);

            if (!Enum.IsDefined(typeof(Role), roleAsInt)) {
                var users = _context.Users.Where(user => user.DrivingSchoolId == user.DrivingSchoolId).Include(user => user.Group).Include(user => user.Instructor);
                var data = users.Skip(offset).Take(limit).ToList();
                var count = users.Count();
                // Returns users of all roles
                return new UserPagination(data, count);
            }
            else
            {
                var users = _context.Users.Where(user => user.DrivingSchoolId == user.DrivingSchoolId && user.Role == (Role)roleAsInt);
                var data = users.Skip(offset).Take(limit).ToList();
                var count = users.Count();
                // Returns users of a specific role
                return new UserPagination(data, count);
            }
        }

        public User GetById(int userId)
        {
            return _context.Users.Include(user => user.Instructor).Include(user => user.Group).FirstOrDefault(user => user.Id == userId);
        }

        public async Task<bool> Add(User userToAdd, int userId, IFormFile file)
        {
            var user = _context.Users.Include(user => user.DrivingSchool).FirstOrDefault(user => user.Id == userId);

            if (user == null) return false;

            var userExists = _context.Users.Any(user => user.Email == userToAdd.Email || user.Oib == userToAdd.Oib);
            var instructorExists = _context.Users.Any(user => user.Id == userToAdd.InstructorId && user.Role == Role.Instructor);
          
            if (userExists || userToAdd.Role == Role.Student && !instructorExists || !userToAdd.ValuesValid())
                return false;

            var randomPassword = RandomStringHelper.GenerateRandomString(10);

            userToAdd.DrivingSchoolId = user.DrivingSchoolId;
            userToAdd.Password = HashHelper.Hash(randomPassword);

            var addedMessage = new MailMessage
            {
                To = { userToAdd.Email },
                Subject = "Driveline Account",
                Body = $"Hi, you have been added as {userToAdd.Role} to {user.DrivingSchool.Name}. Your initial password is: {randomPassword}"
            };

            /*_helper.SendEmail(addedMessage);*/

            if (file != null)
            {
                try
                {
                    var imageFilename = userToAdd.Id + Path.GetExtension(file.FileName);
                    var imageUri = await _fileUploadRepository.UploadImage(file, imageFilename, "profile-images");
                    userToAdd.ImageUri = imageUri;
                }
                catch (Exception ex)
                {
                    ;
                }
            }



            _context.Users.Add(userToAdd);
            _context.SaveChanges();
            return true;
        }

        public async Task<bool> Edit(User editedUser, IFormFile file)
        {
            var user = _context.Users.FirstOrDefault(user => user.Id == editedUser.Id);
            editedUser.Role = user.Role;

            if (user == null)
                return false;

            var userExists = _context.Users.Any(user => user.Id != editedUser.Id && (user.Email == editedUser.Email
                || user.Oib == editedUser.Oib));
            var instructorExists = _context.Users.Any(u => u.Id == user.InstructorId && u.Role == Role.Instructor);

            if (userExists)
                return false;

            user.FirstName = editedUser.FirstName;
            user.LastName = editedUser.LastName;
            user.Oib = editedUser.Oib;
            user.PhoneNumber = editedUser.PhoneNumber;
            user.Email = editedUser.Email;
            user.Vehicle = editedUser.Vehicle;
            user.InstructorId = editedUser.InstructorId;
            user.GroupId = editedUser.GroupId;

            if (file != null)
            {
                try
                {
                    var imageFilename = user.Id + Path.GetExtension(file.FileName);
                    var imageUri = await _fileUploadRepository.UploadImage(file, imageFilename, "profile-images");
                    user.ImageUri = imageUri;
                }
                catch (Exception ex)
                {
                    ;
                }
            }

            _context.SaveChanges();
            return true;
        }

        public bool Delete(int userId)
        {
            var user = _context.Users.
                Include(user => user.DrivingSchool)
                .ThenInclude(drivingSchool => drivingSchool.Users)
                .Include(user => user.StudentDrivingSessions)
                .Include(user => user.InstructorDrivingSessions)
                .Include(user => user.UserEvents)
                .Include(user => user.Students)
                .FirstOrDefault(user => user.Id == userId);

            if (user == null) return false;

            // Doesn't delete if the user has participated in any major activity
            switch(user.Role)
            {
                case Role.Student:
                    if (user.StudentDrivingSessions.Any() || user.UserEvents.Any())
                        return false;
                    break;
                case Role.Instructor:
                    if (user.InstructorDrivingSessions.Any(drivingSession => drivingSession.Status != DrivingSessionStatus.Pending) || user.Students.Any())
                        return false;
                    break;
                case Role.Admin:
                    if (user.DrivingSchool.Users.Count(user => user.Role == Role.Admin) <= 1)
                        return false;
                    break;
            }

            _context.Users.Remove(user);
            _context.SaveChanges();
            return true;
        }

        public List<DrivingSession> GetInstructorSchedule(int instructorId, int userId)
        {
            var user = _context.Users.Find(userId);
            var instructor = _context.Users.Include(user => user.InstructorDrivingSessions).FirstOrDefault(user => user.Id == instructorId);

            if (user.DrivingSchoolId != instructor.DrivingSchoolId) return null;

            return instructor.InstructorDrivingSessions.Where(drivingSession => drivingSession.Status != DrivingSessionStatus.Finished)
                .OrderBy(drivingSession => (int)drivingSession.DayOfWeek)
                .ThenBy(drivingSession => drivingSession.Time).ToList();
        }

        public List<DrivingSession> GetAppointedDrivingSessions(int studentId, int userId)
        {
            var user = _context.Users.Find(userId);
            var student = _context.Users.Include(user => user.StudentDrivingSessions).FirstOrDefault(user => user.Id == studentId);

            if (user.DrivingSchoolId != student.DrivingSchoolId) return null;

            return student.StudentDrivingSessions.Where(drivingSession => drivingSession.Status == DrivingSessionStatus.Appointed || drivingSession.Status == DrivingSessionStatus.Active).ToList();
        }
        
        public List<User> GetInstructorUsers(int instructorId)
        {
            return _context
                .Users
                .Include(i => i.Instructor)
                .Where(u => u.Instructor.Id == instructorId)
                .ToList();
        }

        public StudentStats GetStudentStats(int studentId, int userId)
        {
            var user = _context.Users.Find(userId);
            var student = _context.Users.Include(student => student.DrivingSchool).Include(student => student.StudentDrivingSessions).FirstOrDefault(student => student.Id == studentId);

            if (user.DrivingSchoolId != student.DrivingSchoolId) return null;

            var finishedDrivingSessionsCount = student.StudentDrivingSessions.Count(drivingSession => drivingSession.Status == DrivingSessionStatus.Finished);

            if (finishedDrivingSessionsCount <= 0) return new StudentStats(0, 0);

            var averageRating = (float)_context.Reviews.Where(review => review.StudentId == studentId && review.Type == ReviewType.DrivingSession).Average(review => review.Rating);

            return new StudentStats(finishedDrivingSessionsCount, averageRating);
        }
    }
}