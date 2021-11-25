using System;
using System.Collections.Generic;
using System.Linq;
using DrivingSchoolManager.Data.Entities;
using DrivingSchoolManager.Data.Entities.Models;
using DrivingSchoolManager.Data.Enums;
using DrivingSchoolManager.Domain.Helpers;
using DrivingSchoolManager.Domain.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DrivingSchoolManager.Domain.Repositories.Implementations
{
    public class ReviewRepository : IReviewRepository
    {
        public ReviewRepository(DrivingSchoolManagerContext context, PushNotificationHelper pushNotificationHelper)
        {
            _context = context;
            _pushNotificationHelper = pushNotificationHelper;
        }
        private readonly DrivingSchoolManagerContext _context;
        private readonly PushNotificationHelper _pushNotificationHelper;

        public bool AddReview(Review reviewToAdd, int userId)
        {
            var student = _context.Users.FirstOrDefault(u => u.Id == userId);
            var studentHasReview = _context.Reviews.Any(review => review.StudentId == student.Id && review.Type == ReviewType.Instructor);

            if (student == null || studentHasReview) return false;

            reviewToAdd.Type = ReviewType.Instructor;
            reviewToAdd.StudentId = student.Id;
            reviewToAdd.InstructorId = student.InstructorId;
            reviewToAdd.DateTime = DateTime.Now;

            _context.Reviews.Add(reviewToAdd);
            _context.SaveChanges();

            /*_pushNotificationHelper.NotifyAsync(reviewToAdd.Instructor.NotificationToken,
                                                "New review posted",
                                                $"{student.FirstName} left a {reviewToAdd.Rating} star review");*/

            return true;
        }
        public bool EditReview(Review editedReview, int studentId)
        {
            var reviewToEdit = _context
                .Reviews
                .Include(r => r.Instructor)
                .Include(r => r.Student)
                .FirstOrDefault(r => r.Id == editedReview.Id);

            var student = _context.Users.FirstOrDefault(u => u.Id == studentId);

            if (student == null ||
                reviewToEdit == null ||
                editedReview.Rating < 1 ||
                editedReview.Rating > 5 ||
                editedReview.Comment.Length < 5 ||
                editedReview.Comment.Length > 100 ||
                editedReview.Instructor.Id < 0 ||
                student != editedReview.Student ||
                editedReview.Student != reviewToEdit.Student)
                return false;

            reviewToEdit.Comment = editedReview.Comment;
            reviewToEdit.Instructor = editedReview.Instructor;
            reviewToEdit.Student = editedReview.Student;
            reviewToEdit.Rating = editedReview.Rating;
            reviewToEdit.Type = editedReview.Type;
            reviewToEdit.DateTime = editedReview.DateTime;

            _context.SaveChanges();
            return true;
        }
        public List<Review> GetReviews()
        {
            return _context.Reviews.ToList();
        }
        public Review GetReview(int reviewId)
        {
            return _context.Reviews.Find(reviewId);
        }
        public List<Review> GetStudentReviews(int studentId)
        {
            var student = _context
                .Users
                .Include(u => u.StudentReviews)
                .ThenInclude(sr => sr.Instructor)
                .FirstOrDefault(u => u.Id == studentId);

            if(student == null)
                return new List<Review>();

            return student.StudentReviews.ToList();
        }
        public List<Review> GetInstructorReviews(int instructorId)
        {
            var reviews = _context
                .Reviews
                .Include(review => review.Student)
                .Where(review => review.InstructorId == instructorId
                    && review.Type == ReviewType.Instructor)
                .ToList();

            return reviews;
        }
        public bool DeleteReview(int reviewId)
        {
            var reviewToDelete = _context.Reviews.Find(reviewId);
            if (reviewToDelete == null)
                return false;

            _context.Reviews.Remove(reviewToDelete);
            _context.SaveChanges();
            return true;
        }

        public double GetStudentRating(int studentId)
        {
            var student = _context
                .Users
                .Include(u => u.StudentReviews)
                .FirstOrDefault(u => u.Id == studentId);

            if (student == null) return 0.00;

            var ratingSum = 0.00;

            var studentReviews = student.StudentReviews.Where(sr => sr.Type == ReviewType.DrivingSession).ToList();

            if (studentReviews.Count == 0) return 0.00;

            studentReviews.ForEach(sr => ratingSum += sr.Rating);
            var numberOfRatings = studentReviews.Count;

            return ratingSum / numberOfRatings;
        }
    }
}