using DrivingSchoolManager.Data.Enums;

namespace DrivingSchoolManager.Data.Entities.Models
{
    public class PriceItem
    {
        public int Id { get; set; }
        public Category Category { get; set; }
        public int Price { get; set; }
        public int DrivingSchoolId { get; set; }
        public DrivingSchool DrivingSchool { get; set; }
    }
}
