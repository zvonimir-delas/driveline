using System;
using System.Collections.Generic;
using DrivingSchoolManager.Data.Entities.Models;

namespace DrivingSchoolManager.Domain.DTOs
{
    public class EventDTO
    {
        public EventDTO(List<Event> events, int groupId)
        {
            Events = events;
            GroupId = groupId;
        }

        public List<Event> Events { get; set; }
        public int? GroupId { get; set; }
    }
}
