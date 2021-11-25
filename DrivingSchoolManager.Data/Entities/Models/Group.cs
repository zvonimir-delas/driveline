using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DrivingSchoolManager.Data.Entities.Models
{
    public class Group
    {
        public int Id { get; set; }

        public int DrivingSchoolId { get; set; }

        [MinLength(2), MaxLength(20)]
        public string Name { get; set; }

        public int RegulationsEventNumber { get; set; }

        public int FirstAidEventNumber { get; set; }

        public ICollection<User> Students { get; set; }
    }
}
