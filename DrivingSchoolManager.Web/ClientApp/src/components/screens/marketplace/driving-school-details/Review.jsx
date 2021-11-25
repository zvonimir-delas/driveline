import React from "react";
import "../../../../styles/common/_rating.scss";
import Moment from "react-moment";

import Rating from "../../../helpers/Rating";

const Review = ({ review }) => (
  <div className="list__review">
    <div className="review__properties">
      <span className="properties__fullname">
        {review.student.firstName} {review.student.lastName}
      </span>
      <span className="properties__datetime">
        <Moment format="YYYY/MM/DD HH:mm">{review.dateTime}</Moment>
      </span>
    </div>
    <div className="review__content">
      <p className="content__message">{review.comment}</p>
      <Rating value={review.rating} size={45} editable={false} />
    </div>
  </div>
);

export default Review;
