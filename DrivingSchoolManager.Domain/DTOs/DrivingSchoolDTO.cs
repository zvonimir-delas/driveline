using DrivingSchoolManager.Data.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using DrivingSchoolManager.Data.Enums;

namespace DrivingSchoolManager.Domain.DTOs
{
    public class DrivingSchoolDTO
    {
        public DrivingSchoolDTO(int id, string name, string description, string city, 
            string location, float xCoordinate, float yCoordinate, string email, string phoneNumber, TimeSpan workDayStart, TimeSpan workDayEnd,
            TimeSpan weekendStart, TimeSpan weekendEnd, ICollection<User> users,
            ICollection<PriceItem> priceItems, string imageUri)
        {
            Id = id;
            Name = name;
            Description = description;
            City = city;
            Location = location;
            XCoordinate = xCoordinate;
            YCoordinate = yCoordinate;
            Email = email;
            PhoneNumber = phoneNumber;
            WorkDayStart = workDayStart;
            WorkDayEnd = workDayEnd;
            WeekendStart = weekendStart;
            WeekendEnd = weekendEnd;
            ImageUri = imageUri;
            Instructors = users.Where(u => u.Role == Role.Instructor).ToList();
            Reviews = new List<Review>();
            users
                .ToList()
                .ForEach(u =>
                {
                    var sr = u.StudentReviews
                        .FirstOrDefault(sr => sr.Type == ReviewType.Instructor);
                    if (sr != null)
                        Reviews.Add(sr);
                });
            PriceItems = priceItems.ToList();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string City { get; set; }
        public string Location { get; set; }
        public float XCoordinate { get; set; }
        public float YCoordinate { get; set; }
        public string Email { get; set; }
        public string ImageUri { get; set; }
        public string PhoneNumber { get; set; }
        public TimeSpan WorkDayStart { get; set; }
        public TimeSpan WorkDayEnd { get; set; }
        public TimeSpan WeekendStart { get; set; }
        public TimeSpan WeekendEnd { get; set; }
        public List<User> Instructors { get; set; }
        public List<Review> Reviews { get; set; }
        public List<PriceItem> PriceItems { get; set; }
    }
}