using System;
using System.Collections.Generic;
using System.Text;
using System.Timers;

namespace DrivingSchoolManager.Domain.Scheduler
{
    public class TimerService
    {
        private Timer Timer { get; set; }

        public TimerService(Action action, double interval)
        {
            Timer = new Timer(interval);
            Timer.Elapsed += (t, e) => OnElapsed(action, interval);
            Timer.Start();
        }

        private void OnElapsed(Action action, double interval)
        {
            Timer.Stop();
            try
            {
                action();
            }
            finally
            {
                Timer.Start();
            }
        }
    }
}
