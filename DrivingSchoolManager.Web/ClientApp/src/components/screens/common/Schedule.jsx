import React from "react";

import ScheduleGroup from "./ScheduleGroup";

const Schedule = ({ schedule, drivingSessionClickHandler }) => {
  return (
    <section className="profile__schedule">
      {Object.entries(schedule).map(([day, group], index) => (
        <ScheduleGroup
          key={index}
          title={day}
          drivingSessions={group}
          drivingSessionClickHandler={drivingSessionClickHandler}
        />
      ))}
    </section>
  );
};

export default Schedule;
