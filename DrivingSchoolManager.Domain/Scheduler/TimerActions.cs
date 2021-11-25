using DrivingSchoolManager.Data.Entities;
using System;
using System.Linq;
using DrivingSchoolManager.Data.Enums;
using DrivingSchoolManager.Domain.Helpers;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchoolManager.Domain.Scheduler
{
    public static class TimerActions
    {

        private static IConfiguration _configuration { get; set; }

        public static void SetConfigurationForAllTimers(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public static void SendRemindersForDrivingSessions()
        {
            var options = new DbContextOptions<DrivingSchoolManagerContext>();
            var context = new DrivingSchoolManagerContext(options);
            var pushNotificationHelper = new PushNotificationHelper(_configuration);

            /*var upcomingDrivingSessions =
                context.DrivingSessions
                    .Where(session => session.Status == DrivingSessionStatus.Appointed &&
                                      (DateTime.Now.Add(-session.Time) - DateTime.Now.Date).TotalMinutes > 0 &&
                                      (DateTime.Now.Add(-session.Time) - DateTime.Now.Date).TotalMinutes < 60)
                    .ToList();

            foreach(var session in upcomingDrivingSessions)
            {
                pushNotificationHelper.NotifyAsync(session.Instructor.NotificationToken,
                                              
            "Driving session reminder",
                                                    $"Student: {session.Student.FirstName} Time: {session.Time.Hours}:{session.Time.Minutes}");
                pushNotificationHelper.NotifyAsync(session.Instructor.NotificationToken,
                                                    "Driving session reminder",
                                                    $"You have a booked driving session at {session.Start.Value.ToShortTimeString()}");
            }*/
        }
    }
}
