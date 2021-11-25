using System.Collections.Generic;
using DrivingSchoolManager.Data.Entities.Models;
using DrivingSchoolManager.Domain.DTOs;

namespace DrivingSchoolManager.Domain.Repositories.Interfaces
{
    public interface IDrivingSchoolRepository
    {
        List<DrivingSchool> GetDrivingSchools(int pageNumber, int pageSize, string search, string city, string category, int minPrice, int maxPrice);
        DrivingSchoolDTO GetDrivingSchoolById(int id);
        double GetDrivingSchoolRating(int drivingSchoolId);
    }
}