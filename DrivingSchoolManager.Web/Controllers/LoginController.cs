using DrivingSchoolManager.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace DrivingSchoolManager.Web.Controllers
{
    [Route("login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public LoginController(ILoginRepository loginRepository)
        {
            _loginRepository = loginRepository;
        }
        private readonly ILoginRepository _loginRepository;

        [HttpPost]
        public IActionResult Login(JObject userCredentials)
        {
            var userDTO = _loginRepository.Login(userCredentials["email"].ToString(),
                userCredentials["password"].ToString(), userCredentials["notificationToken"].ToString());

            if (userDTO == null)
                return Forbid();

            return Ok(userDTO);
        }

        [HttpPost("new")]
        public IActionResult GetNewToken(JObject existingToken)
        {
            return Ok(_loginRepository.GetNewToken(existingToken["token"].ToString()));
        }
    }
}