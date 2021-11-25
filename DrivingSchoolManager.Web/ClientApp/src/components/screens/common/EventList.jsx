import React from "react";
import moment from "moment";

import Event from "./Event";

const EventList = ({ events }) => {
  return (
    <section className="events__list events__list--column">
      {!events ? (
        <p>No events</p>
      ) : (
        events.map((userEvent) => {
          return (
            <Event
              key={userEvent.id}
              event={userEvent.event}
              direction="horizontal"
            />
          );
        })
      )}
    </section>
  );
};

export default EventList;
