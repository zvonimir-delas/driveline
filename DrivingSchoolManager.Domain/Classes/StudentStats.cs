namespace DrivingSchoolManager.Domain.Classes
{
    public class StudentStats
    {
        public StudentStats(int progress, float rating)
        {
            Progress = progress;
            Rating = rating;
        }

        public int Progress { get; set; }
        public float Rating { get; set; }
    }
}
