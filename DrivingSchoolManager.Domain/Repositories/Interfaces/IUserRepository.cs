using System.Collections.Generic;
using System.Threading.Tasks;
using DrivingSchoolManager.Data.Entities.Models;
using DrivingSchoolManager.Domain.Classes;
using Microsoft.AspNetCore.Http;

namespace DrivingSchoolManager.Domain.Repositories.Interfaces
{
    public interface IUserRepository
    {
        User GetById(int userId);
        UserPagination GetByRole(int roleAsInt, int userId, int limit, int offset);
        Task<bool> Add(User userToAdd, int userId, IFormFile file);
        Task<bool> Edit(User editedUser, IFormFile file);
        bool Delete(int userId);
        List<User> GetInstructorUsers(int instructorId);
        List<DrivingSession> GetInstructorSchedule(int instructorId, int userId);
        List<DrivingSession> GetAppointedDrivingSessions(int studentId, int userId);
        StudentStats GetStudentStats(int studentId, int userId);
    }
}