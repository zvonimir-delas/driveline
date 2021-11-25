using System.Collections.Generic;
using System.Linq;
using DrivingSchoolManager.Data.Entities;
using DrivingSchoolManager.Data.Entities.Models;
using DrivingSchoolManager.Data.Enums;
using DrivingSchoolManager.Domain.Classes;
using DrivingSchoolManager.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchoolManager.Domain.Repositories.Implementations
{
    public class GroupsRepository : IGroupsRepository
    {
        public GroupsRepository(DrivingSchoolManagerContext drivingSchoolManagerContext)
        {
            _context = drivingSchoolManagerContext;
        }

        private readonly DrivingSchoolManagerContext _context;

        public Group GetById(int id)
        {
            return _context.Groups.Find(id);
        }

        public GroupPagination GetByDrivingSchoolId(int drivingSchoolId, int limit, int offset)
        {
            var groups = _context.Groups
                .Include(group => group.Students)
                .Where(group => group.DrivingSchoolId == drivingSchoolId);

            var data = groups
                .Skip(offset)
                .Take(limit)
                .ToList();

            var count = groups
                .Count();

            return new GroupPagination(data, count);
        }

        public Group Add(Group groupToAdd)
        {
            _context.Groups.Add(groupToAdd);
            _context.SaveChanges();
            return groupToAdd;
        }

        public Group Edit(Group editedGroup, Group groupToEdit)
        {
            groupToEdit.Name = editedGroup.Name;
            _context.SaveChanges();
            return groupToEdit;
        }

        public void Delete(Group groupToDelete)
        {
            _context.Groups.Remove(groupToDelete);
            _context.SaveChanges();
        }

        public bool IsUnique(Group groupToValidate)
        {
            var groupExists = _context.Groups.Any(group => group.Name == groupToValidate.Name);
            if (groupExists) return false;
            return true;
        }
    }
}
