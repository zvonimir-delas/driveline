using System.Collections.Generic;
using System.Threading.Tasks;
using DrivingSchoolManager.Data.Entities.Models;
using DrivingSchoolManager.Domain.Classes;
using DrivingSchoolManager.Domain.DTOs;
using Microsoft.AspNetCore.Http;

namespace DrivingSchoolManager.Domain.Repositories.Interfaces
{
    public interface IDrivingSessionRepository
    {
        DrivingSession GetById(int drivingSessionId);
        List<DrivingSession> GetFinishedByStudentId(int userId, int studentId);
        bool Add(DrivingSession drivingSessionToAdd, int userId);
        bool Edit(DrivingSession editedDrivingSession, int userId);
        bool Appoint(DrivingSession appointedDrivingSession, int userId);
        bool Finish(DrivingSessionDTO drivingSessionDTO, int userId);
        bool Cancel(int drivingSessionId);
        Task<bool> Finish(DrivingSessionDTO drivingSessionDTO, int userId, IFormFile fileToUpload);
        bool Delete(int drivingSessionId);
    }
}