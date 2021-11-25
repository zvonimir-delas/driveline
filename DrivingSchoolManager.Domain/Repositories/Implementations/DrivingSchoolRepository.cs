using System;
using System.Collections.Generic;
using System.Linq;
using DrivingSchoolManager.Data.Entities;
using DrivingSchoolManager.Data.Entities.Models;
using DrivingSchoolManager.Data.Enums;
using DrivingSchoolManager.Domain.DTOs;
using DrivingSchoolManager.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchoolManager.Domain.Repositories.Implementations
{
    public class DrivingSchoolRepository : IDrivingSchoolRepository
    {
        public DrivingSchoolRepository(DrivingSchoolManagerContext context)
        {
            _context = context;
        }

        private readonly DrivingSchoolManagerContext _context;

        public List<DrivingSchool> GetDrivingSchools(int pageNumber, int pageSize, string search, string city, string category, int minPrice, int maxPrice)
        {
            // base for all queries
            var searchResultsQuery = _context.DrivingSchools
                .Include(school => school.PriceItems)
                .AsQueryable();

            Enum.TryParse(category, true, out Category parsedCategory);

            // filtering by minPrice is always applied as the default value is 0
            searchResultsQuery = searchResultsQuery
                                 .Where(school => school.PriceItems.Any(item => item.Price >= minPrice));

            // filter results by name property
            if (!string.IsNullOrWhiteSpace(search))
                searchResultsQuery = searchResultsQuery
                                     .Where(school => school.Name.Contains(search));
            // filter results by city property
            if (!string.IsNullOrWhiteSpace(city))
                searchResultsQuery = searchResultsQuery
                                     .Where(school => school.City.Contains(city));

            // filter results by category and respective price for that category
            if (!string.IsNullOrWhiteSpace(category) &&
                !category.Equals("Any") && maxPrice != 0)
                searchResultsQuery = searchResultsQuery
                                     .Where(school => school.PriceItems.Any(item => item
                                                                                    .Category.Equals(parsedCategory) &&
                                                                                    Enumerable.Range(minPrice, maxPrice).Contains(item.Price)));
            // filter results by category && check minPrice for that category
            else if (!string.IsNullOrWhiteSpace(category) && !category.Equals("Any"))
                searchResultsQuery = searchResultsQuery
                                     .Where(school => school.PriceItems.Any(item => item
                                                                                    .Category.Equals(parsedCategory) && 
                                                                                    item.Price > minPrice));
            // filter results by price
            else if (maxPrice != 0)
                searchResultsQuery = searchResultsQuery
                                     .Where(school => school.PriceItems.Any(item => Enumerable.Range(minPrice, maxPrice).Contains(item.Price)));

            // return combined query
            return searchResultsQuery
                   .Skip(pageSize * pageNumber)
                   .Take(pageSize)
                   .ToList();
        }

        public DrivingSchoolDTO GetDrivingSchoolById(int id)   
        {
            var drivingSchool = _context.DrivingSchools
                .Include(ds => ds.PriceItems)
                .Include(ds => ds.Users)
                .ThenInclude(u => u.StudentReviews)
                .ThenInclude(sr => sr.Student)
                .FirstOrDefault(ds => ds.Id == id);

            if (drivingSchool == null) return null;

            return new DrivingSchoolDTO(
                drivingSchool.Id,
                drivingSchool.Name,
                drivingSchool.Description,
                drivingSchool.City,
                drivingSchool.Location,
                drivingSchool.XCoordinate,
                drivingSchool.YCoordinate,
                drivingSchool.Email,
                drivingSchool.PhoneNumber,
                drivingSchool.WorkDayStart,
                drivingSchool.WorkDayEnd,
                drivingSchool.WeekendStart,
                drivingSchool.WeekendEnd,
                drivingSchool.Users,
                drivingSchool.PriceItems,
                drivingSchool.ImageUri
                );
        }

        public double GetDrivingSchoolRating(int drivingSchoolId)
        {
            var drivingSchool = _context
                .DrivingSchools
                .Include(ds => ds.Users)
                .ThenInclude(u => u.StudentReviews)
                .FirstOrDefault(ds => ds.Id == drivingSchoolId);

            if (drivingSchool == null) return 0.00;

            var sum = 0.00;
            var numberOfReviews = 0;

            var users = drivingSchool
                .Users
                .ToList();

            // Iterates all students from selected driving school for reviews to get an average review
            users
                .ForEach(u => {
                    var sr = u.StudentReviews
                        .FirstOrDefault(sr => sr.Type == ReviewType.Instructor);
                    if (sr != null)
                    {
                        sum += sr.Rating;
                        numberOfReviews++;
                    }
                   }
                );

            if (numberOfReviews == 0) return 0.00;
            return sum / numberOfReviews;
        }
    }
}