using DrivingSchoolManager.Data.Entities.Models;
using DrivingSchoolManager.Domain.Helpers;
using DrivingSchoolManager.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DrivingSchoolManager.Web.Controllers
{
    [Route("groups")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        public GroupsController(IGroupsRepository groupsRepository, JwtHelper jwtHelper)
        {
            _groupsRepository = groupsRepository;
            _jwtHelper = jwtHelper;
        }

        private readonly IGroupsRepository _groupsRepository;
        private readonly JwtHelper _jwtHelper;

        private static string GetTokenFromRequest(HttpRequest request)
        {
            return request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{groupId}")]
        public IActionResult GetById(int groupId)
        {
            var userDrivingSchoolId = _jwtHelper.GetDrivingSchoolIdFromToken(GetTokenFromRequest(Request));

            var group = _groupsRepository.GetById(groupId);
            if (group == null) return NotFound();
            else if (group.DrivingSchoolId != userDrivingSchoolId) return Forbid();

            return Ok(group);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("driving-school-id/{drivingSchoolId}")]
        public IActionResult GetByDrivingSchoolId(int drivingSchoolId, int limit, int offset)
        {
            var userDrivingSchoolId = _jwtHelper.GetDrivingSchoolIdFromToken(GetTokenFromRequest(Request));

            var groups = _groupsRepository.GetByDrivingSchoolId(drivingSchoolId, limit, offset);
            if (groups == null) return NotFound();
            else if (drivingSchoolId != userDrivingSchoolId) return Forbid();
 
            return Ok(groups);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Add(Group groupToAdd)
        {
            var userDrivingSchoolId = _jwtHelper.GetDrivingSchoolIdFromToken(GetTokenFromRequest(Request));
            groupToAdd.DrivingSchoolId = userDrivingSchoolId;

            var isGroupUnique = _groupsRepository.IsUnique(groupToAdd);

            if (!isGroupUnique) return Conflict();

            var addedGroup = _groupsRepository.Add(groupToAdd);
            return Created($"{addedGroup.Id}", addedGroup);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public IActionResult Edit(Group editedGroup)
        {
            var userDrivingSchoolId = _jwtHelper.GetDrivingSchoolIdFromToken(GetTokenFromRequest(Request));

            var groupToEdit = _groupsRepository.GetById(editedGroup.Id);
            if (groupToEdit == null) return NotFound();

            var updatedGroup = _groupsRepository.Edit(editedGroup, groupToEdit);
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{groupId}")]
        public IActionResult Delete(int groupId)
        {
            var userDrivingSchoolId = _jwtHelper.GetDrivingSchoolIdFromToken(GetTokenFromRequest(Request));
            var groupToDelete = _groupsRepository.GetById(groupId);

            if (groupToDelete.DrivingSchoolId != userDrivingSchoolId) return Forbid();

            _groupsRepository.Delete(groupToDelete);
            return NoContent();
        }
    }
}
