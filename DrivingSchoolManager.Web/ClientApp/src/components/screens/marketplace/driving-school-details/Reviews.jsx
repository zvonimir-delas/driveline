import React from "react";

import SectionSeperator from "../../../helpers/SectionSeperator";
import Review from "./Review";

const Reviews = ({ reviews }) => {
  if (reviews === undefined) return <p>Error</p>;

  return (
    <section className="driving-school__reviews">
      <SectionSeperator title="Reviews" />
      <div className="reviews__list">
        {(reviews.length === 0) ? <p>No reviews.</p> : reviews.map((review, index) =>
          <Review key={index} review={review} />
        )}
      </div>
    </section>
  )
};

export default Reviews;
