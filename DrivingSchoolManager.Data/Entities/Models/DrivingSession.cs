using System;
using System.Collections.Generic;
using DrivingSchoolManager.Data.Enums;
using System.ComponentModel.DataAnnotations;

namespace DrivingSchoolManager.Data.Entities.Models
{
    public class DrivingSession
    {
        public int Id { get; set; }
        public int Number { get; set; }
        [Range(-180, 180)]
        public float? XCoordinate { get; set; }
        [Range(-90, 90)]
        public float? YCoordinate { get; set; }
        public ICollection<DrivingSessionLocationLog> LocationLogs { get; set; }
        public string SignatureUri { get; set; }
        public DayOfWeek? DayOfWeek { get; set; }
        public TimeSpan Time { get; set; }
        public DrivingSessionStatus? Status { get; set; }
        public int InstructorId { get; set; }
        public User Instructor { get; set; }
        public int? StudentId { get; set; }
        public User Student { get; set; }
    }
}
