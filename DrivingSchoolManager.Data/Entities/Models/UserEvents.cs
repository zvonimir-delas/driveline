
namespace DrivingSchoolManager.Data.Entities.Models
{
    public class UserEvents
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int EventId { get; set; }
        public Event Event { get; set; }
        public bool Present { get; set; }
        public float ScoredPoints { get; set; }
        public bool Passed { get; set; }
    }
}