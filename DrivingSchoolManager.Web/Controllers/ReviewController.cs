using DrivingSchoolManager.Data.Entities.Models;
using DrivingSchoolManager.Domain.Helpers;
using DrivingSchoolManager.Domain.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DrivingSchoolManager.Web.Controllers
{
    [Route("reviews")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        public ReviewController(IReviewRepository reviewRepository, JwtHelper helper)
        {
            _reviewRepository = reviewRepository;
            _helper = helper;
        }
        private readonly IReviewRepository _reviewRepository;
        private readonly JwtHelper _helper;
        private static string GetTokenFromRequest(HttpRequest request)
        {
            return request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        }

        [Authorize(Roles = "Student")]
        [HttpPost("add")]
        public IActionResult AddReview(Review reviewToAdd)
        {
            var userId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));

            var addSuccessful = _reviewRepository.AddReview(reviewToAdd, userId);
            if (!addSuccessful) return Forbid();

            return Ok();
        }

        [Authorize(Roles = "Student,Admin")]
        [HttpPost("edit")]
        public IActionResult EditReview(Review reviewToEdit)
        {
            var studentId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));
            var wasEditSuccessful = _reviewRepository.EditReview(reviewToEdit, studentId);

            if (wasEditSuccessful)
                return Ok();
            return Forbid();
        }

        [Authorize(Roles = "Student,Admin")]
        [HttpGet("get")]
        public IActionResult GetReviews()
        { 
            return Ok(_reviewRepository.GetReviews());
        }

        [Authorize(Roles = "Student,Admin")]
        [HttpGet("get/student-rating-by-token")]
        public IActionResult GetStudentRating()
        {
            var studentId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));
            return Ok(_reviewRepository.GetStudentRating(studentId));
        }

        [HttpGet("get/{reviewId}")]
        public IActionResult GetReview(int reviewId)
        {
            return Ok(_reviewRepository.GetReview(reviewId));
        }

        [Authorize(Roles = "Student")]
        [HttpGet("get/student-reviews-by-token")]
        public IActionResult GetStudentReviews()
        {
            var studentId = _helper.GetUserIdFromToken(GetTokenFromRequest(Request));
            return Ok(_reviewRepository.GetStudentReviews(studentId));
        }

        [HttpGet("get-by-instructor/{instructorId}")]
        public IActionResult GetInstructorReviews(int instructorId)
        {
            return Ok(_reviewRepository.GetInstructorReviews(instructorId));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("delete/{reviewId}")]
        public IActionResult DeleteReview(int reviewId)
        {
            var wasDeleteSuccessful = _reviewRepository.DeleteReview(reviewId);
            if (wasDeleteSuccessful)
                return Ok(null);
            return Forbid();
        }
    }
}