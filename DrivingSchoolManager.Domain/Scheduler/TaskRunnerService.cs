using System;
using System.Collections.Generic;
using System.Text;

namespace DrivingSchoolManager.Domain.Scheduler
{
    public static class TaskRunnerService
    {
        public static List<TimerService> TimerServices { get; set; } = new List<TimerService>();
        public static List<TimerServiceFirstTimeSetup> TimerServiceSetups { get; set; } = new List<TimerServiceFirstTimeSetup>();

        public static void StartAction(Action action, double interval)
        {
            TimerServices.Add(new TimerService(action, interval));
        }

        public static void AddFirstTimeSetupTimer(Action action, int intervalInHours)
        {
            TimerServiceSetups.Add(new TimerServiceFirstTimeSetup(action, intervalInHours));
        }
    }
}
