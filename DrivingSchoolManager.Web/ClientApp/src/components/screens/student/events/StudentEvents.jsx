import React, { useState, useEffect } from "react";
import { getByUser } from "../../../../services/events";

import "../../../../styles/screens/student/_events.scss";
import StudentLayout from "../../../layouts/StudentLayout";
import SectionSeperator from "../../../helpers/SectionSeperator";
import EventList from "../../common/EventList";
import PresenceConfirmationModal from "./PresenceConfirmationModal";
import Modal from "../../../helpers/Modal";

const StudentEvents = () => {
  const [events, setEvents] = useState([]);
  const [modalToggle, setModalToggle] = useState(false);

  useEffect(() => {
    getByUser().then(({ data }) => {
      setEvents(data);
    });
  });

  const handleModalToggle = () => {
    setModalToggle(!modalToggle);
  };

  return (
    <>
      <StudentLayout />
      <main className="events">
        <SectionSeperator
          title="Events"
          button="Scan"
          buttonClickHandler={handleModalToggle}
        />
        <EventList events={events} />
      </main>
      <Modal
        title="QR Reader"
        toggle={modalToggle}
        toggleHandler={handleModalToggle}>
        <PresenceConfirmationModal
          modalToggleHandler={handleModalToggle}
          eventsUpdateHandler={getByUser}
        />
      </Modal>
    </>
  );
};

export default StudentEvents;
