using System;
using System.Linq;
using DrivingSchoolManager.Data.Entities;
using DrivingSchoolManager.Domain.DTOs;
using DrivingSchoolManager.Domain.Helpers;
using DrivingSchoolManager.Domain.Repositories.Interfaces;

namespace DrivingSchoolManager.Domain.Repositories.Implementations
{
    public class LoginRepository : ILoginRepository
    {
        public LoginRepository(DrivingSchoolManagerContext context, JwtHelper helper)
        {
            _context = context;
            _helper = helper;
        }
        private readonly DrivingSchoolManagerContext _context;
        private readonly JwtHelper _helper;

        public UserDTO Login(string email, string password, string notificationToken)
        {
            var userToLogin = _context.Users.SingleOrDefault(user => user.Email == email);

            if (userToLogin == null || !HashHelper.ValidatePassword(password, userToLogin.Password))
                return null;

            var jwtToken = _helper.GetJwtToken(userToLogin);

            if(notificationToken != null && notificationToken != userToLogin.NotificationToken)
            {
                _context.Users.First(user => user.Email == email).NotificationToken = notificationToken;
                _context.SaveChanges();
            }

            return new UserDTO(userToLogin, jwtToken);
        }

        public string GetNewToken(string existingToken)
        {
            var userToRefresh = _context.Users.Find(_helper.GetUserIdFromToken(existingToken));
            return userToRefresh == null ? null : _helper.GetNewToken(existingToken);
        }
    }
}