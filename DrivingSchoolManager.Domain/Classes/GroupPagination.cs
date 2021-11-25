using System;
using System.Collections.Generic;
using DrivingSchoolManager.Data.Entities.Models;
namespace DrivingSchoolManager.Domain.Classes
{
    public class GroupPagination
    {
        public GroupPagination(List<Group> data, int count)
        {
            Data = data;
            Count = count;
        }

        public List<Group> Data { get; set; }
        public int Count { get; set; }
    }
}
