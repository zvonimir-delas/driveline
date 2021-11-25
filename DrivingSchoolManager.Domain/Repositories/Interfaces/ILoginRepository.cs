using DrivingSchoolManager.Domain.DTOs;

namespace DrivingSchoolManager.Domain.Repositories.Interfaces
{
    public interface ILoginRepository
    {
        UserDTO Login(string email, string password, string? notificationToken);
        string GetNewToken(string existingToken);
    }
}