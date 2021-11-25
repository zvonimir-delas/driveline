using System;
using System.ComponentModel.DataAnnotations;

namespace DrivingSchoolManager.Data.Entities.Models
{
    public class DrivingSessionLocationLog
    {
        public int Id { get; set; }
        [Range(-180, 180)]
        public float XCoordinate { get; set; }
        [Range(-90, 90)]
        public float YCoordinate { get; set; }
        public DateTime Timestamp { get; set; }
        public int DrivingSessionId { get; set; }
        public DrivingSession DrivingSession { get; set; }
    }
}
