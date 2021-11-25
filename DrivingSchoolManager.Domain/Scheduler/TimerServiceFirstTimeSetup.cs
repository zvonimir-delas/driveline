using System;
using System.Collections.Generic;
using System.Text;
using System.Timers;

namespace DrivingSchoolManager.Domain.Scheduler
{
    public class TimerServiceFirstTimeSetup
    {
        private Timer FirstTimeSetupTimer { get; set; }

        public TimerServiceFirstTimeSetup(Action action, int intervalInHours)
        {
            var time = DateTime.Now;
            var nextOccurenceOfFullHour = time.AddMinutes(60 - time.Minute);
            var nextOccurenceOfTimer = nextOccurenceOfFullHour.AddHours(intervalInHours - 1);
            var interval = nextOccurenceOfTimer.Subtract(DateTime.Now).TotalMilliseconds;

            FirstTimeSetupTimer = new Timer(interval);
            FirstTimeSetupTimer.Elapsed += (t, e) => OnElapsed(action, interval);
            FirstTimeSetupTimer.Start();
        }

        private void OnElapsed(Action action, double interval)
        {
            FirstTimeSetupTimer.Stop();
            TaskRunnerService.StartAction(action, interval);
        }
    }
}
