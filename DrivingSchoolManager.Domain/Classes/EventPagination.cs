using System;
using System.Collections.Generic;
using DrivingSchoolManager.Data.Entities.Models;

namespace DrivingSchoolManager.Domain.Classes
{
    public class EventPagination
    {
        public EventPagination(List<Event> data, int count)
        {
            Data = data;
            Count = count;
        }

        public List<Event> Data { get; set; }
        public int Count { get; set; }
    }
}
