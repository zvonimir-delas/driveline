import React, { useEffect, useRef } from "react";

import "../../../../styles/screens/student/_scheduler.scss";
import Rating from "../../../helpers/Rating";
import { roundRating } from "../../../../utils/rating";
import { getCategoryProps } from "../../../../utils/category";

const ProgressBar = ({ studentCategory, studentStats }) => {
  const numberOfLessons = getCategoryProps(studentCategory).drivingLessons;
  const progressPercentage = (studentStats.progress / numberOfLessons) * 100;
  const progressBarRef = useRef(null);

  useEffect(() => {
    progressBarRef.current.style.width = `${progressPercentage}%`;
  }, [progressPercentage]);

  return (
    <>
      <div className="progress__container">
        <div className="progress__bar-container">
          <span className="progress__lessons">
            {studentStats.progress} out of {numberOfLessons} driving lessons
          </span>
          <div className="progress__bar">
            <div
              className="progress__bar progress__bar--filled"
              ref={progressBarRef}
            />
          </div>
        </div>

        <Rating value={roundRating(studentStats.rating)} editable={false} />
      </div>
    </>
  );
};

export default ProgressBar;
