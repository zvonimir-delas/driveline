import React from "react";
import moment from "moment";
import { dayToString } from "../../../utils/schedule";
import drivingSessionStatus from "../../../constants/drivingSessionStatus.json";

const ScheduleGroup = ({
  title,
  drivingSessions,
  drivingSessionClickHandler,
}) => {
  return (
    <div className="schedule__group">
      <h2
        className={`schedule__day ${
          dayToString(moment().day()) === title
            ? "schedule__day--highlighted"
            : ""
        }`}>
        {title}
      </h2>
      <div className="schedule__appointments">
        {drivingSessions === undefined ? (
          <p>No driving session</p>
        ) : (
          drivingSessions.map((drivingSession, index) => (
            <div
              key={index}
              onClick={() => drivingSessionClickHandler(drivingSession)}
              className={`schedule__appointment ${
                drivingSession.status === drivingSessionStatus.appointed
                  ? "schedule__appointment--taken"
                  : ""
              }`}>
              {moment(drivingSession.time, "HH:mm:ss").format("HH:mm")}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScheduleGroup;
