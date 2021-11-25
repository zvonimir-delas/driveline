import React, { useState, useEffect } from "react";
import { getDrivesByInstructor } from "../../../../services/events";

import "../../../../styles/screens/student/_events.scss";
import InstructorLayout from "../../../layouts/InstructorLayout";
import SectionSeperator from "../../../helpers/SectionSeperator";
import EventList from "../../common/EventList";

var hasBeenCalled = false;

const InstructorEvents = () => {
  const [events, setEvents] = useState([]);


  useEffect(() => {
    getDrivesByInstructor().then(({ data }) => {
      setEvents(data);
    });
  }, []);

  return (
    <>
      <InstructorLayout />
      <main className="events">
        <SectionSeperator title="Events" />
        <EventList events={events} />
      </main>
    </>
  );
};

export default InstructorEvents;
