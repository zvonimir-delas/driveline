import React, { useState, useEffect } from "react";
import { getReviewsByInstructorId } from "../../../../services/reviews";

import Review from "./Review";

const InstructorReviewsModal = ({ selectedInstructorId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    selectedInstructorId &&
      getReviewsByInstructorId(selectedInstructorId).then(({ data }) => {
        setReviews(data);
      });
  }, []);

  return (
    <div className="driving-school__reviews">
      <div className="reviews__list">
        {reviews.length > 0 &&
          reviews.map((review) => <Review review={review} />)}
      </div>
    </div>
  );
};

export default InstructorReviewsModal;
