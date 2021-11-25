import React from "react";

import InstructorImage from "../../../../assets/images/instructor.jpg";

const Instructor = ({ instructor, instructorReviewsModalToggleHandler }) => (
  <div
    className="list__instructor"
    onClick={() => instructorReviewsModalToggleHandler()}
  >
    <img src={instructor.imageUri ?? InstructorImage} alt="Instructor" className="instructor__image" />
    <span className="instructor__fullname">
      {instructor.firstName} {instructor.lastName}
      <br />
      {instructor.vehicle}
    </span>
  </div>
);

export default Instructor;
