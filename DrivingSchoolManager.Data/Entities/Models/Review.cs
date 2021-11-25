using DrivingSchoolManager.Data.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace DrivingSchoolManager.Data.Entities.Models
{
    public class Review
    {
        public int Id { get; set; }
        public ReviewType Type { get; set; }
        [Range(1, 5)]
        public int Rating { get; set; }
        [MinLength(5), MaxLength(2000)]
        public string Comment { get; set; }
        public DateTime DateTime { get; set; }
        public int? InstructorId { get; set; }
        public User Instructor { get; set; }
        public int StudentId { get; set; }
        public User Student { get; set; }
    }
}
