using System;
using System.Collections.Generic;
using DrivingSchoolManager.Data.Entities.Models;

namespace DrivingSchoolManager.Domain.Classes
{
    public class UserPagination
    {
        public UserPagination(List<User> data, int count)
        {
            Data = data;
            Count = count;
        }

        public List<User> Data { get; set; }
        public int Count { get; set; }
    }
}
