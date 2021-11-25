using System.Collections.Generic;
using DrivingSchoolManager.Data.Entities.Models;
using DrivingSchoolManager.Domain.Classes;

namespace DrivingSchoolManager.Domain.Repositories.Interfaces
{
    public interface IGroupsRepository
    {
        // CRUD
        Group GetById(int id);
        GroupPagination GetByDrivingSchoolId(int drivingSchoolId, int limit, int offset);
        Group Add(Group groupToAdd);
        Group Edit(Group editedGroup, Group groupToEdit);
        void Delete(Group groupToDelete);

        // Valdation
        bool IsUnique(Group group);
    }
}
