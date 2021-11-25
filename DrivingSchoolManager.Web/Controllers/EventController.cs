using System;
using System.Collections.Generic;
using DrivingSchoolManager.Data.Entities.Models;
using DrivingSchoolManager.Domain.Classes;
using DrivingSchoolManager.Domain.DTOs;
using DrivingSchoolManager.Domain.Helpers;
using DrivingSchoolManager.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DrivingSchoolManager.Web.Controllers
{
    [Route("events")]
    [ApiController]
    public class EventController : ControllerBase
    {
        public EventController(IEventRepository eventRepository, JwtHelper helper)
        {
            _eventRepository = eventRepository;
            _helper = helper;
        }
        private readonly IEventRepository _eventRepository;
        private readonly JwtHelper _helper;

        private static string GetTokenFromRequest(HttpRequest request)
        {
            return request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        }

        [Authorize]
        [HttpGet("get-by-id/{eventId}")]
        public IActionResult GetById(int eventId)
        {
            return Ok(_eventRepository.GetById(eventId));
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("get-event-students/{eventId}")]
        public IActionResult GetEventStudents(int eventId)
        {
            var adminId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            return Ok(_eventRepository.GetUserEventsByEventId(eventId, adminId));
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add-exam-results/{eventId}")]
        public IActionResult AddExamResults(List<ExamResult> examResults, int eventId)
        {
            var adminId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            var addSuccessful = _eventRepository.AddExamResults(eventId, examResults, adminId);
            if (!addSuccessful) return Forbid();

            return Ok(addSuccessful);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("get-by-driving-school")]
        public IActionResult GetByDrivingSchool(List<DateTime> dates, int limit, int offset)
        {
            var adminId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            return Ok(_eventRepository.GetByDrivingSchool(adminId, dates, limit, offset));
        }


        //[Authorize(Roles = "Student")]
        [HttpGet("get-by-user")]
        public IActionResult GetByUser()
        {
            var userId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            return Ok(_eventRepository.GetByUser(userId));
        }

        [Authorize(Roles = "Instructor")]
        [HttpGet("get-drives-by-instructor")]
        public IActionResult GetDrivesByInstructor()
        {
            var userId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            return Ok(_eventRepository.GetDrivesByInstructor(userId));
        }

        [Authorize(Roles="Admin")]
        [HttpPost("add")]
        public IActionResult AddEvent(EventDTO eventToAdd)
        {
            var adminId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            var addSuccessful = _eventRepository.Add(eventToAdd, adminId);
            if (!addSuccessful) return Forbid();

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add-exam-or-drive")]
        public IActionResult AddExamOrDrive(UserEvents userEvents)
        {
            return Ok(_eventRepository.AddExamOrDrive(userEvents));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete/{eventId}")]
        public IActionResult DeleteEvent(int eventId)
        {
            var adminId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            var deleteSuccessful = _eventRepository.Delete(eventId, adminId);
            if (!deleteSuccessful) return Forbid();

            return Ok();
        }

        [Authorize(Roles = "Student")]
        [HttpGet("confirm-presence/{eventGuid}")]
        public IActionResult ConfirmPresence(Guid eventGuid)
        {
            var studentId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            var confirmSuccessful = _eventRepository.ConfirmPresence(eventGuid, studentId);
            if (!confirmSuccessful) return Forbid();

            return Ok();
        }
    }
}