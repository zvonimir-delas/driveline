import React from "react";
import moment from "moment";

import FirstAidIcon from "../../../assets/icons/medkit-inverted.svg";
import RegulationsIcon from "../../../assets/icons/warning-inverted.svg";
import DriveIcon from "../../../assets/icons/car-inverted.svg";

import eventTopic from "../../../constants/eventTopic.json";
import LocationIcon from "../../../assets/icons/location-inverted.svg";
import CalendarIcon from "../../../assets/icons/calendar-inverted.svg";
import ClockIcon from "../../../assets/icons/clock-inverted.svg";

const DrivingLesson = ({ event, direction }) => {
  const icon =
    (event.topic === eventTopic.firstAid && FirstAidIcon) ||
    (event.topic === eventTopic.regulations && RegulationsIcon) ||
    (event.topic === eventTopic.drive && DriveIcon);
  const background =
    (event.topic === eventTopic.firstAid && "events__event--red") ||
    (event.topic === eventTopic.regulations && "events__event--yellow") ||
    (event.topic === eventTopic.drive && "events__event--blue");

  return (
    <div
      className={`events__event ${
        direction === "horizontal" && "events__event--horizontal"
      } ${background}`}>
      <div className="events__title-data-container">
        <h2 className="events__title">{`${event.topic} ${event.type}`}</h2>
        <div className="events__data-container">
          <img src={CalendarIcon} alt="Icon" className="events__data-icon" />
          <span className="events__data">
            {moment(event.start).format("DD/MM/YYYY")}
          </span>
        </div>
        <div className="events__data-container">
          <img src={ClockIcon} alt="Icon" className="events__data-icon" />
          <span className="events__data">{`${moment(event.start).format(
            "dddd"
          )} ${moment(event.start).format("HH:mm")} - ${moment(
            event.end
          ).format("HH:mm")}`}</span>
        </div>
        {event.location && (
          <div className="events__data-container">
            <img src={LocationIcon} alt="Icon" className="events__data-icon" />
            <span className="events__data">{event.location}</span>
          </div>
        )}
      </div>

      <img src={icon} alt="Event icon" className="events__icon" />
    </div>
  );
};

export default DrivingLesson;
