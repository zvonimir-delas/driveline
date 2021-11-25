using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using DrivingSchoolManager.Data.Entities.Models;

namespace DrivingSchoolManager.Domain.DTOs
{
    public class DrivingSessionDTO
    {
        public DrivingSessionDTO(int drivingSessionId, List<DrivingSessionLocationLog> locationLogs, int rating)
        {
            DrivingSessionId = drivingSessionId;
            LocationLogs = locationLogs;
            Rating = rating;
        }

        public int DrivingSessionId { get; set; }
        public List<DrivingSessionLocationLog> LocationLogs { get; set; }
        public IFormFile Signature { get; set; }
        public int Rating { get; set; }
    }
}
