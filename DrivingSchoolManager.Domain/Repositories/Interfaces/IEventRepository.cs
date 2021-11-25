using DrivingSchoolManager.Data.Entities.Models;
using System.Collections.Generic;
using DrivingSchoolManager.Domain.DTOs;
using System;
using DrivingSchoolManager.Domain.Classes;

namespace DrivingSchoolManager.Domain.Repositories.Interfaces
{
    public interface IEventRepository
    {
        Event GetById(int eventId);
        EventPagination GetByDrivingSchool(int adminId, List<DateTime> dates, int limit, int offset);
        List<UserEvents> GetByUser(int userId);
        List<UserEvents> GetDrivesByInstructor(int instructorId);
        bool Add(EventDTO eventDTO, int adminId);
        bool AddExamOrDrive(UserEvents userEvents);
        bool Delete(int eventId, int adminId);
        bool ConfirmPresence(Guid eventGuid, int studentId);
        List<UserEvents> GetUserEventsByEventId(int eventId, int userId);
        bool AddExamResults(int eventId, List<ExamResult> examResults, int adminId);
    }
}
