using DrivingSchoolManager.Data.Entities.Models;

namespace DrivingSchoolManager.Domain.DTOs
{
    public class UserDTO
    {
        public UserDTO(User user, string token)
        {
            User = user;
            Token = token;
        }

        public User User { get; set; }
        public string Token { get; set; }
    }
}
