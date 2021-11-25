using DrivingSchoolManager.Data.Entities.Models;
using System.Collections.Generic;

namespace DrivingSchoolManager.Domain.Repositories.Interfaces
{
    public interface IReviewRepository
    {
        bool AddReview(Review reviewToAdd, int userId);
        bool EditReview(Review reviewToEdit, int studentId);
        List<Review> GetReviews();
        Review GetReview(int reviewId);
        List<Review> GetStudentReviews(int studentId);
        List<Review> GetInstructorReviews (int instructorId);
        bool DeleteReview(int reviewId);
        double GetStudentRating(int studentId);
    }
}