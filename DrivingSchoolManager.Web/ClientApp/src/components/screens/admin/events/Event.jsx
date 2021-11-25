import React from "react";
import moment from "moment";

import CalendarIcon from "../../../../assets/icons/calendar.svg";
import ClockIcon from "../../../../assets/icons/clock.svg";

const Event = ({ event, qrCodeModalToggleHandler, setEventToDelete }) => {
  return (
    <div className="admin-events__event">
      <div className="admin-events__info">
        <h2 className="admin-events__info">{event.topic}</h2>
        <span className="admin-events__type">{event.type}</span>
        <div className="admin-events__data-container">
          <img
            src={CalendarIcon}
            alt="Calendar icon"
            className="admin-events__data-icon"
          />
          <span className="admin-events__data">
            {moment(event.start).format("MM-DD-YYYY")}
          </span>
        </div>
        <div className="event-panel__data-container">
          <img
            src={ClockIcon}
            alt="Clock icon"
            className="admin-events__data-icon"
          />
          <span className="admin-events__data">{`${moment(event.start).format(
            "HH:mm"
          )} - ${moment(event.end).format("HH:mm")}`}</span>
        </div>
      </div>
      <div className="admin-events__controls">
        <button
          className="admin-events__button admin-events__button--green"
          onClick={() => qrCodeModalToggleHandler(event.id)}>
          QR Code
        </button>
        <button
          className="admin-events__button admin-events__button--red"
          onClick={() => setEventToDelete(event)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default Event;
