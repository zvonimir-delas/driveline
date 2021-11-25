using DrivingSchoolManager.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace DrivingSchoolManager.Data.Entities.Models
{
    public class User
    {
        public int Id { get; set; }

        [MinLength(2), MaxLength(30)]
        public string FirstName { get; set; }

        [MinLength(2), MaxLength(20)]
        public string LastName { get; set; }

        public string ImageUri { get; set; }

        public string NotificationToken { get; set; }

        public string Oib { get; set; }

        [MinLength(5), MaxLength(30)]
        public string Email { get; set; }

        public Category? Category { get; set; }

        [Phone]
        public string PhoneNumber { get; set; }

        public string Password { get; set; }

        public int? GroupId { get; set; }

        public Group Group { get; set; }

        [MinLength(2), MaxLength(20)]
        public string Vehicle { get; set; }

        public Role Role { get; set; }

        public int? InstructorId { get; set; }

        public User Instructor { get; set; }

        public int DrivingSchoolId { get; set; }

        public DrivingSchool DrivingSchool { get; set; }

        public ICollection<User> Students { get; set; }

        public ICollection<UserEvents> UserEvents { get; set; }

        public ICollection<DrivingSession> InstructorDrivingSessions { get; set; }

        public ICollection<DrivingSession> StudentDrivingSessions { get; set; }

        public ICollection<Review> StudentReviews { get; set; }

        public ICollection<Review> InstructorReviews { get; set; }
   
        public bool ValuesValid()
        {
            var userValuesValid = Oib.All(Char.IsNumber);
            var studentValuesValid = Role == Role.Student && (InstructorId != null || Vehicle == null);
            var instructorValuesValid = Role == Role.Instructor && (InstructorId == null || Vehicle != null);
            var adminValuesValid = Role == Role.Admin && (InstructorId == null || Vehicle == null);
            var roleValuesValid = studentValuesValid || instructorValuesValid || adminValuesValid;

            if (!userValuesValid || !roleValuesValid) return false;
            return true;
        } 
    }
}
