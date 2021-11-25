import React from "react";

const StudentEvent = ({ title, description, result, icon, eventStyle }) => {
  return (
    <div className={`events__event ${eventStyle}`}>
      <div className="events__title-description-container">
        <h2 className="events__title">{title}</h2>
        <p className="events__description">{description}</p>
      </div>
      <div className="events__result-icon-container">
        <span className="events__result">{result}</span>
        <img src={icon} alt={`${title} icon`} className="events__icon" />
      </div>
    </div>
  );
};

export default StudentEvent;
