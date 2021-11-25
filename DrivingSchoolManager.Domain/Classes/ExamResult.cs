namespace DrivingSchoolManager.Domain.Classes
{
    public class ExamResult
    {
        public ExamResult(int userId, int scoredPoints)
        {
            UserId = userId;
            ScoredPoints = scoredPoints;
        }

        public int UserId { get; set; }
        public int ScoredPoints { get; set; }
    }
}