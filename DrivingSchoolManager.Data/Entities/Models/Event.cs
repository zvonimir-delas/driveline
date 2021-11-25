using DrivingSchoolManager.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DrivingSchoolManager.Data.Entities.Models
{
    public class Event
    {
        public int Id { get; set; }
        public Guid Guid { get; set; }
        public int Number { get; set; }
        public EventTopic Topic { get; set; }
        public EventType Type { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        [MinLength(5), MaxLength(30)]
        public string Location { get; set; }
        public int? TotalPoints { get; set; }
        public ICollection<UserEvents> UserEvents { get; set; }
    }
}
