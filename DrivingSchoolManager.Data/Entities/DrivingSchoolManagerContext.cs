using DrivingSchoolManager.Data.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchoolManager.Data.Entities
{
    public class DrivingSchoolManagerContext : DbContext
    {
        public DrivingSchoolManagerContext(DbContextOptions options)
            : base (options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<DrivingSchool> DrivingSchools { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<DrivingSession> DrivingSessions { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<PriceItem> PriceItems { get; set; }
        public DbSet<UserEvents> UserEvents { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<DrivingSessionLocationLog> DrivingSessionLocationLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserEvents>()
                .HasOne(ue => ue.User)
                .WithMany(u => u.UserEvents);

            modelBuilder.Entity<UserEvents>()
                .HasOne(ue => ue.Event)
                .WithMany(e => e.UserEvents);

            modelBuilder.Entity<DrivingSession>()
                .HasOne(ds => ds.Instructor)
                .WithMany(i => i.InstructorDrivingSessions);

            modelBuilder.Entity<DrivingSession>()
                .HasOne(ds => ds.Student)
                .WithMany(s => s.StudentDrivingSessions);

            modelBuilder.Entity<Review>()
                .HasOne(ur => ur.Instructor)
                .WithMany(i => i.InstructorReviews);

            modelBuilder.Entity<Review>()
                .HasOne(ur => ur.Student)
                .WithMany(s => s.StudentReviews);
        }
    }
}
