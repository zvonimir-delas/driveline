using DrivingSchoolManager.Data.Entities.Models;
using DrivingSchoolManager.Domain.Classes;
using DrivingSchoolManager.Domain.Helpers;
using DrivingSchoolManager.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace DrivingSchoolManager.Web.Controllers
{
    [Route("users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserController(IUserRepository userRepository, JwtHelper helper, IFileUploadRepository fileUploadRepository)
        {
            _userRepository = userRepository;
            _helper = helper;
            _fileUploadRepository = fileUploadRepository;
        }
        private readonly IUserRepository _userRepository;
        private readonly IFileUploadRepository _fileUploadRepository;
        private readonly JwtHelper _helper;

        private static string GetTokenFromRequest(HttpRequest request)
        {
            return request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        }

        [Authorize]
        [HttpGet("get-by-id/{userId}")]
        public IActionResult GetById(int userId)
        {
            var user = _userRepository.GetById(userId);

            if (user == null) return NotFound();

            return Ok(user);
        }

        [Authorize]
        [HttpGet("get-by-role/{roleAsInt}")]
        public IActionResult GetByRole(int roleAsInt, int limit, int offset)
        {
            var userId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            var users = _userRepository.GetByRole(roleAsInt, userId, limit, offset);
            return Ok(users);
        }

        [Authorize]
        [HttpGet("get-by-token")]
        public IActionResult GetByToken()
        {
            var userId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));
            return Ok(_userRepository.GetById(userId));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add")]
        public async Task<IActionResult> Add([FromForm] FileInputModel model)
        {
            var adminId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            var userToAdd = JsonConvert.DeserializeObject<User>(model.AlphanumerincFormData);

            var addSuccessful = await _userRepository.Add(userToAdd, adminId, model.FileToUpload);
            if (!addSuccessful)
                return Forbid();

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("edit")]
        public async Task<IActionResult> Edit([FromForm] FileInputModel model)
        {
            var userToEdit = JsonConvert.DeserializeObject<User>(model.AlphanumerincFormData);

            var editSuccessful = await _userRepository.Edit(userToEdit, model.FileToUpload);

            if (!editSuccessful)
                return Forbid();

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete/{userId}")]
        public IActionResult Delete(int userId)
        {
            var deleteSuccessful = _userRepository.Delete(userId);

            if (!deleteSuccessful) return NotFound();

            return Ok();
        }

        [Authorize]
        [HttpGet("get-instructor-schedule/{instructorId}")]
        public IActionResult GetInstructorId(int instructorId)
        {
            var userId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            var drivingSessions = _userRepository.GetInstructorSchedule(instructorId, userId);
            return Ok(drivingSessions);
        }

        [Authorize]
        [HttpGet("get-appointed-driving-sessions/{studentId}")]
        public IActionResult GetAppointedDrivingSessions(int studentId)
        {
            var userId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            var drivingSessions = _userRepository.GetAppointedDrivingSessions(studentId, userId);
            return Ok(drivingSessions);
        }

        [Authorize(Roles="Instructor")]
        [HttpGet("get/instructor-users-by-token")]
        public IActionResult GetInstructorUsers()
        {
            var instructorId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            return Ok(_userRepository.GetInstructorUsers(instructorId));
        }

        [Authorize()]
        [HttpGet("get-student-stats/{studentId}")]
        public IActionResult GetStudentStats(int studentId)
        {
            var userId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            var studentStats = _userRepository.GetStudentStats(studentId, userId);
            if (studentStats == null) return Forbid();

            return Ok(studentStats);
        }
    }
}