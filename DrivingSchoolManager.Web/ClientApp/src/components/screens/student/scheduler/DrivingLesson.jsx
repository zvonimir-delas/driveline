import React from "react";

import ClockIcon from "../../../../assets/icons/clock-inverted.svg";
import DrivingLessonIcon from "../../../../assets/icons/car-inverted.svg";

const DrivingLesson = ({ drivingSession }) => {
  console.log(drivingSession);
  return (
    <div className={`events__event`}>
      <div className="events__title-data-container">
        <h2 className="events__title">{`Driving session`}</h2>
        <div className="events__data-container">
          <img src={ClockIcon} alt="Time icon" className="events__data-icon" />
          <span className="events__data">{`${drivingSession.dayOfWeek} ${drivingSession.time}`}</span>
        </div>
      </div>

      <img
        src={DrivingLessonIcon}
        alt="Driving lesson icon"
        className="events__icon"
      />
    </div>
  );
};

export default DrivingLesson;
