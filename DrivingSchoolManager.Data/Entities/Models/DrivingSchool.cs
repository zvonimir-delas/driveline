using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DrivingSchoolManager.Data.Entities.Models
{
    public class DrivingSchool
    {
        public int Id { get; set; }
        [MinLength(5), MaxLength(20)]
        public string Name { get; set; }
        public string ImageUri { get; set; }
        [MinLength(100), MaxLength(500)]
        public string Description { get; set; }
        [MinLength(5), MaxLength(30)]
        public string City { get; set; }
        [MinLength(5), MaxLength(30)]
        public string Location { get; set; }
        [Range(-180, 180)]
        public float XCoordinate { get; set; }
        [Range(-90, 90)]
        public float YCoordinate { get; set; }
        [MinLength(5), MaxLength(30)]
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public TimeSpan WorkDayStart { get; set; }
        public TimeSpan WorkDayEnd { get; set; }
        public TimeSpan WeekendStart { get; set; }
        public TimeSpan WeekendEnd { get; set; }
        public ICollection<User> Users { get; set; }
        public ICollection<PriceItem> PriceItems { get; set; }
    }
}
