import React from "react";

import SectionSeperator from "../../../helpers/SectionSeperator";
import DrivingLesson from "./DrivingLesson";

const DrivingLessons = ({ drivingLessons }) => {
  return (
    <section className="profile__events">
      <SectionSeperator title="Upcoming" />
      <div className="events__list">
        {drivingLessons.map((drivingLesson, index) => (
          <DrivingLesson key={index} drivingSession={drivingLesson} />
        ))}
      </div>
    </section>
  );
};

export default DrivingLessons;
