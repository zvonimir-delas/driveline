using System;

namespace DrivingSchoolManager.Domain.DTOs
{
    public class UserEventDTO
    {
        public UserEventDTO(int id, string name, DateTime start, string location, string type)
        {
            Id = id;
            Name = name;
            Start = start;
            Location = location;
            Type = type;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public string Location { get; set; }
        public string Type { get; set; }
    }
}
