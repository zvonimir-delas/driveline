using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DrivingSchoolManager.Data.Entities;
using DrivingSchoolManager.Data.Entities.Models;
using DrivingSchoolManager.Data.Enums;
using DrivingSchoolManager.Domain.DTOs;
using DrivingSchoolManager.Domain.Helpers;
using DrivingSchoolManager.Domain.Repositories.Interfaces;
using DrivingSchoolManager.Domain.Scheduler;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchoolManager.Domain.Repositories.Implementations
{
    public class DrivingSessionRepository : IDrivingSessionRepository
    {
        public DrivingSessionRepository(DrivingSchoolManagerContext context, PushNotificationHelper pushNotificationHelper, IFileUploadRepository fileUploadRepository)
        {
            _context = context;
            _pushNotificationHelper = pushNotificationHelper;
            _fileUploadRepository = fileUploadRepository;
        }

        private readonly DrivingSchoolManagerContext _context;
        private readonly PushNotificationHelper _pushNotificationHelper;
        private readonly IFileUploadRepository _fileUploadRepository;

        public DrivingSession GetById(int drivingSessionId)
        {
            return _context.DrivingSessions.Include(drivingSession => drivingSession.Student).FirstOrDefault(drivingSession => drivingSession.Id == drivingSessionId);
        }

        public List<DrivingSession> GetFinishedByStudentId(int userId, int studentId)
        {
            var user = _context.Users.Find(userId);
            var student = _context.Users.Include(student => student.StudentDrivingSessions).ThenInclude(studentDrivingSession => studentDrivingSession.LocationLogs).FirstOrDefault(student => student.Id == studentId);
            if (user.DrivingSchoolId != student.DrivingSchoolId) return null;
            var drivingSessions = student.StudentDrivingSessions.Where(drivingSession => drivingSession.Status == DrivingSessionStatus.Finished).ToList();
            return drivingSessions;
        }

        public bool Add(DrivingSession drivingSessionToAdd, int userId)
        {
            var user = _context.Users.Include(user => user.InstructorDrivingSessions).FirstOrDefault(user => user.Id == userId);

            drivingSessionToAdd.Status = DrivingSessionStatus.Pending;
            drivingSessionToAdd.InstructorId = user.Id;

            // Limits to 8 hour shifts
            var exceedsLimitPerDay = user.InstructorDrivingSessions.Count(drivingSession => drivingSession.Status == DrivingSessionStatus.Pending
                && drivingSession.DayOfWeek == drivingSessionToAdd.DayOfWeek) > 8;

            var eventExistsInOneHourInterval = user.InstructorDrivingSessions.Any(drivingSession => 
                Math.Abs(drivingSession.Time.TotalMinutes - drivingSessionToAdd.Time.TotalMinutes) < 60
                && drivingSession.DayOfWeek == drivingSessionToAdd.DayOfWeek && drivingSession.Status != DrivingSessionStatus.Finished);

            if (exceedsLimitPerDay || eventExistsInOneHourInterval)
                ;//return false;

            var a = "a";
            _context.DrivingSessions.Add(drivingSessionToAdd);
            try
            {
                _context.SaveChanges();
            }
            catch(Exception ex)
            {
                a = ex.Message;
            }

            /*foreach (var student in drivingSessionToAdd.Instructor.Students)
                _pushNotificationHelper.NotifyAsync(student.NotificationToken,
                                                    "New driving slot available",
                                                    $"{drivingSessionToAdd.Time}");*/
                                                    
            return true;
        }

        public bool Edit(DrivingSession editedDrivingSession, int userId)
        {
            var user = _context.Users.Include(user => user.InstructorDrivingSessions).FirstOrDefault(u => u.Id == userId);
            var drivingSessionToEdit = _context
                .DrivingSessions
                .FirstOrDefault(ds => ds.Id == editedDrivingSession.Id);

            if (user == null || drivingSessionToEdit == null)
                return false;

            drivingSessionToEdit.Time = editedDrivingSession.Time;
            drivingSessionToEdit.DayOfWeek = editedDrivingSession.DayOfWeek;

            // Limits to 8 hour shifts
            var exceedsLimitPerDay = user.InstructorDrivingSessions.Count(drivingSession => drivingSession.Status == DrivingSessionStatus.Pending
                && drivingSession.DayOfWeek == editedDrivingSession.DayOfWeek) > 8;

            var eventExistsInOneHourInterval = user.InstructorDrivingSessions.Any(drivingSession => drivingSession.Status == DrivingSessionStatus.Pending
                && Math.Abs(drivingSession.Time.TotalMinutes - drivingSessionToEdit.Time.TotalMinutes) < 60
                && drivingSession.DayOfWeek == drivingSessionToEdit.DayOfWeek && drivingSession.Id != drivingSessionToEdit.Id);

            if (exceedsLimitPerDay || eventExistsInOneHourInterval)
                return false;

            _context.SaveChanges();
            return true;
        }

        public bool Appoint(DrivingSession appointedDrivingSession, int userId)
        {
            var drivingSession = _context.DrivingSessions.Find(appointedDrivingSession.Id);

            if (drivingSession.Status != DrivingSessionStatus.Pending) return false;

            var user = _context.Users.Include(user => user.StudentDrivingSessions).Include(user => user.DrivingSchool).FirstOrDefault(user => user.Id == userId);

            // Limits 2 active appointments per student
            if (user.StudentDrivingSessions.Count(drivingSession => drivingSession.Status == DrivingSessionStatus.Appointed) >= 2)
                return false;

            // Limits student to select pick up area near driving school (roughly 1 kilometer)
            if (Math.Abs((float)appointedDrivingSession.XCoordinate - user.DrivingSchool.XCoordinate) > 0.01 || Math.Abs((float)appointedDrivingSession.YCoordinate - user.DrivingSchool.YCoordinate) > 0.01)
                return false;

            drivingSession.XCoordinate = appointedDrivingSession.XCoordinate;
            drivingSession.YCoordinate = appointedDrivingSession.YCoordinate;
            drivingSession.Status = DrivingSessionStatus.Appointed;
            drivingSession.StudentId = userId;
            drivingSession.Number = user.StudentDrivingSessions.Count() + 1;

            _context.SaveChanges();

            /*_pushNotificationHelper.NotifyAsync(drivingSession.Instructor.NotificationToken,
                                                "Driving session booked",
                                                $"{drivingSession.Student} at {drivingSession.Time}");*/
            return true;
        }

        public async Task<bool> Finish(DrivingSessionDTO drivingSessionDTO, int userId, IFormFile fileToUpload)
        {
            var user = _context.Users.Include(user => user.InstructorDrivingSessions).FirstOrDefault(user => user.Id == userId);
            var drivingSession = user.InstructorDrivingSessions.FirstOrDefault(drivingSession => drivingSession.Id == drivingSessionDTO.DrivingSessionId);

            if (drivingSession == null) return false;

            drivingSession.Status = DrivingSessionStatus.Finished;

            _context.Reviews.Add(new Review
            {
                Type = ReviewType.DrivingSession,
                Rating = drivingSessionDTO.Rating,
                InstructorId = drivingSession.InstructorId,
                StudentId = drivingSession.StudentId.GetValueOrDefault(),
                DateTime = DateTime.Now
            });

            drivingSessionDTO.LocationLogs.ForEach(log => log.DrivingSessionId = drivingSession.Id);
            _context.DrivingSessionLocationLogs.AddRange(drivingSessionDTO.LocationLogs);

            if (fileToUpload != null)
            {
                try
                {
                    var imageFilename = drivingSession.Id + ".png";
                    var imageUri = await _fileUploadRepository.UploadImage(fileToUpload, imageFilename, "signature-images");
                    drivingSession.SignatureUri = imageUri;
                }
                catch (Exception ex)
                {
                    ;
                }
            }

            _context.DrivingSessions.Add(
                new DrivingSession { DayOfWeek = drivingSession.DayOfWeek, Time = drivingSession.Time, Status = DrivingSessionStatus.Pending, InstructorId = drivingSession.InstructorId, SignatureUri = drivingSession.SignatureUri });
            
            _context.SaveChanges();
            return true;
        }

        public bool Cancel(int drivingSessionId)
        {
            var drivingSession = _context.DrivingSessions.Find(drivingSessionId);
            if (drivingSession == null) return false;
            drivingSession.Status = DrivingSessionStatus.Pending;
            drivingSession.StudentId = null;
            drivingSession.Student = null;
            _context.SaveChanges();
            return true;
        }

        public bool Delete(int drivingSessionId)
        {
            var drivingSessionToDelete = _context.DrivingSessions.Find(drivingSessionId);
            if (drivingSessionToDelete == null)
                return false;

            _context.DrivingSessions.Remove(drivingSessionToDelete);
            _context.SaveChanges();
            return true;
        }
    }
}
