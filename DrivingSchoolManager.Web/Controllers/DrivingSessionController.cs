using DrivingSchoolManager.Data.Entities.Models;
using DrivingSchoolManager.Domain.Classes;
using DrivingSchoolManager.Domain.DTOs;
using DrivingSchoolManager.Domain.Helpers;
using DrivingSchoolManager.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace DrivingSchoolManager.Web.Controllers
{
    [Route("driving-sessions")]
    [ApiController]
    public class DrivingSessionController : ControllerBase
    {
        public DrivingSessionController(IDrivingSessionRepository drivingSessionRepository, JwtHelper helper)
        {
            _drivingSessionRepository = drivingSessionRepository;
            _helper = helper;
        }
        private readonly IDrivingSessionRepository _drivingSessionRepository;
        private readonly JwtHelper _helper;

        private static string GetTokenFromRequest(HttpRequest request)
        {
            return request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        }

        [Authorize]
        [HttpGet("get-by-id/{drivingSessionId}")]
        public IActionResult GetDrivingSession(int drivingSessionId)
        {
            return Ok(_drivingSessionRepository.GetById(drivingSessionId));
        }

        [Authorize]
        [HttpGet("student-id/{studentId}")]
        public IActionResult GetByStudentId(int studentId)
        {
            var userId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            return Ok(_drivingSessionRepository.GetFinishedByStudentId(userId, studentId));
        }

        [Authorize(Roles = "Instructor")]
        [HttpPost("add")]
        public IActionResult AddDrivingSession(DrivingSession drivingSession)
        {
            var userId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            var addSuccessful = _drivingSessionRepository.Add(drivingSession, userId);
            if (!addSuccessful) return Forbid();

            return Ok();
        }

        [Authorize]
        [HttpPost("edit")]
        public IActionResult EditDrivingSession(DrivingSession editedDrivingSession)
        {
            var userId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));
            var editSuccessful = _drivingSessionRepository.Edit(editedDrivingSession, userId);
            if (!editSuccessful)
                return Forbid();
            return Ok();
        }
        
        [Authorize(Roles = "Student")]
        [HttpPost("appoint")]
        public IActionResult AppointDrivingSession(DrivingSession appointedDrivingSession)
        {
            var userId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            var appointmentSuccessful = _drivingSessionRepository.Appoint(appointedDrivingSession, userId);
            if (!appointmentSuccessful) return Forbid();

            return Ok();
        }

        [Authorize(Roles = "Instructor")]
        [HttpPost("finish")] 
        public async Task<IActionResult> FinishDrivingSession([FromForm] FileInputModel model)
        {
            var userId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            var drivingSession = JsonConvert.DeserializeObject<DrivingSessionDTO>(model.AlphanumerincFormData);

            var finishSuccessful = await _drivingSessionRepository.Finish(drivingSession, userId, model.FileToUpload);
            if (!finishSuccessful) return Forbid();

            return Ok();
        }

        [Authorize(Roles = "Instructor")]
        [HttpPost("cancel/{drivingSessionId}")]
        public IActionResult CancelDrivingSession(int drivingSessionId)
        {
            var cancelSuccessful = _drivingSessionRepository.Cancel(drivingSessionId);
            if (!cancelSuccessful) return Forbid();
            return Ok();
        }

        [Authorize]
        [HttpDelete("delete/{drivingSessionId}")]
        public IActionResult DeleteDrivingSession(int drivingSessionId)
        {
            return Ok(_drivingSessionRepository.Delete(drivingSessionId));
        }
    }
}