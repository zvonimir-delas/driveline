using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DrivingSchoolManager.Data.Entities.Models;
using DrivingSchoolManager.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DrivingSchoolManager.Web.Controllers
{
    [Route("driving-schools")]
    [ApiController]
    public class DrivingSchoolController : ControllerBase
    {
        public DrivingSchoolController(IDrivingSchoolRepository drivingSchoolRepository)
        {
            _drivingSchoolRepository = drivingSchoolRepository;
        }
        private readonly IDrivingSchoolRepository _drivingSchoolRepository;

        [HttpGet("get-driving-schools")]
        public IActionResult GetDrivingSchools(int pageNumber, int pageSize, string search, string city, string category, int minPrice, int maxPrice)
        {
            return Ok(_drivingSchoolRepository.GetDrivingSchools(pageNumber, pageSize, search, city, category, minPrice, maxPrice));
        }

        [HttpGet("get-by-id/{id}")]
        public IActionResult GetDrivingSchoolById(int id)
        {
            var drivingSchool = _drivingSchoolRepository.GetDrivingSchoolById(id);
            if (drivingSchool != null)
                return Ok(drivingSchool);
            return NotFound();
        }

        [HttpGet("get-rating/{id}")]
        public IActionResult GetDrivingSchoolRating(int id)
        {
            return Ok(_drivingSchoolRepository.GetDrivingSchoolRating(id));
        }
    }
}