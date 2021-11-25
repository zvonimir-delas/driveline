using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using DrivingSchoolManager.Data.Entities;
using DrivingSchoolManager.Data.Entities.Models;
using DrivingSchoolManager.Data.Enums;
using DrivingSchoolManager.Domain.Classes;
using DrivingSchoolManager.Domain.DTOs;
using DrivingSchoolManager.Domain.Helpers;
using DrivingSchoolManager.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchoolManager.Domain.Repositories.Implementations
{
    public class EventRepository : IEventRepository
    {
        public EventRepository(DrivingSchoolManagerContext context, EmailHelper emailHelper)
        {
            _context = context;
            _helper = emailHelper;
        }
        private readonly DrivingSchoolManagerContext _context;
        private readonly EmailHelper _helper;

        public Event GetById(int eventId)
        {
            return _context.Events.Find(eventId);
        }

        public List<UserEvents> GetUserEventsByEventId(int eventId, int userId)
        {
            var user = _context.Users.Find(userId);
            var @event = _context.Events.Include(@event => @event.UserEvents).ThenInclude(userEvent => userEvent.User).FirstOrDefault(@event => @event.Id == eventId);
            return @event.UserEvents.ToList();
        }

        public EventPagination GetByDrivingSchool(int adminId, List<DateTime> dates, int limit, int offset)
        {
            var admin = _context.Users.Find(adminId);
            var formattedDates = dates.Select(date => date.Date);

            var events = _context.Events
                .Where(@event => @event.UserEvents.Any(userEvent => userEvent.User.DrivingSchoolId == admin.DrivingSchoolId)
                    && formattedDates.Contains(@event.Start.Date));

            var data = events
                .Skip(offset)
                .Take(limit)
                .OrderBy(@event => @event.Start)
                .ToList();

            var count = events.Count();

            return new EventPagination(data, count);
        }

        public List<UserEvents> GetByUser(int userId)
        {
            var user = _context.Users.Include(user => user.UserEvents).ThenInclude(userEvent => userEvent.Event).FirstOrDefault(user => user.Id == userId);

            return user.UserEvents.Where(userEvent => !userEvent.Present).OrderBy(userEvent => userEvent.Event.Start).ToList();
        }

        public List<UserEvents> GetDrivesByInstructor(int instructorId)
        {
            var userEvents = _context.UserEvents.Include(userEvent => userEvent.User).Include(userEvent => userEvent.Event).Where(userEvent => userEvent.User.InstructorId == instructorId && userEvent.Event.Topic == EventTopic.Drive).ToList();
            return userEvents;
        }

        public bool Add(EventDTO eventDTO, int adminId)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == adminId);
            var groupId = eventDTO.GroupId;
            var events = eventDTO.Events;
            var @event = events.FirstOrDefault();

            // Generates guids used in qr codes for every event that is going to be created 
            events.ForEach(@event =>
            {
                do @event.Guid = Guid.NewGuid();
                while (_context.Events.Any(e => e.Guid == @event.Guid));
            });

            if (_context.Events.Any(e => e.Guid == @event.Guid)) return false;

            var students = _context.DrivingSchools
                .Include(drivingSchool => drivingSchool.Users)
                .FirstOrDefault(drivingSchool => drivingSchool.Id == user.DrivingSchoolId)
                .Users.Where(user => user.Role == Role.Student && user.GroupId == groupId)
                .ToList();

            if (students == null) return false;

            _context.AddRange(events);
            _context.SaveChanges();

            // Mails all participants and connects them with events
            students.ForEach(student =>
            {
                var addedMessage = new MailMessage
                {
                    To = { student.Email },
                    Subject = "Driveline Event",
                    Body = $"Hi, you have been invited to {@event.Topic} {@event.Type} on {@event.Start.Date} at {@event.Start.TimeOfDay} - {@event.End.TimeOfDay}"
                };

                events.ForEach(@event =>
                {
                    _context.UserEvents.Add(new UserEvents()
                    {
                        UserId = student.Id,
                        EventId = @event.Id
                    });
                    _context.SaveChanges();
                });

                /*_helper.SendEmail(addedMessage);*/
            });

            return true;
        }

        public bool AddExamOrDrive(UserEvents userEvents)
        {
            _context.UserEvents.Add(userEvents);
            _context.SaveChanges();
            return true;
        }

        public bool Delete(int eventId, int adminId)
        {
            var eventToDelete = _context.Events
                .Include(@event => @event.UserEvents).ThenInclude(userEvent => userEvent.Event)
                .Include(@event => @event.UserEvents).ThenInclude(userEvent => userEvent.User)
                .FirstOrDefault(@event => @event.Id == eventId);
            if (eventToDelete == null)
                return false;

            // Mails all participants
            eventToDelete.UserEvents.ToList().ForEach(userEvent =>
            {
                var removedMessage = new MailMessage
                {
                    To = { userEvent.User.Email },
                    Subject = "Driveline Event",
                    Body = $"Hi, event {userEvent.Event.Topic} {userEvent.Event.Type} on {userEvent.Event.Start.Date} at {userEvent.Event.Start.TimeOfDay} - {userEvent.Event.End.TimeOfDay} has been canceled"
                };

                /*_helper.SendEmail(removedMessage);*/
            });

            _context.Events.Remove(eventToDelete);
            _context.SaveChanges();
            return true;
        }

        // Used in qr code scanning to verify student's presence
        public bool ConfirmPresence(Guid eventGuid, int studentId)
        {
            var @event = _context.Events.Include(@event => @event.UserEvents).ThenInclude(userEvent => userEvent.User).FirstOrDefault(@event => @event.Guid == eventGuid);

            var userEvent = @event.UserEvents.FirstOrDefault(userEvent => userEvent.User.Id == studentId);
            if (userEvent == null) return false;

            userEvent.Present = true;
            _context.SaveChanges();
            return true;
        }

        public bool AddExamResults(int eventId, List<ExamResult> examResults, int adminId)
        {
            var @event = _context.Events.Include(@event => @event.UserEvents).ThenInclude(userEvent => userEvent.User).FirstOrDefault(@event => @event.Id == eventId);

            if (@event == null) return false;

            examResults.ForEach(examResult => {
                var userEvent = @event.UserEvents.FirstOrDefault(userEvent => userEvent.User.Id == examResult.UserId);
                if (userEvent != null)
                    userEvent.ScoredPoints = examResult.ScoredPoints;
            });

            _context.SaveChanges();
            return true;
        }
    }
}
