import React, { useState, useEffect } from "react";
import { getByDrivingSchool, deleteEvent } from "../../../../services/events";
import "../../../../styles/screens/admin/_events.scss";

import DayPicker, { DateUtils } from "react-day-picker";
import Modal from "../../../helpers/Modal";
import Dialog from "../../../helpers/Dialog";
import SectionSeperator from "../../../helpers/SectionSeperator";
import EventList from "./EventList";
import EventForm from "./EventForm";
import QRCodeModal from "./QRCodeModal";

const eventsPerPage = 10;

const AdminEvents = () => {
  const [page, setPage] = useState(0);
  const [events, setEvents] = useState({ data: [], count: 0 });
  const [formToggle, setFormToggle] = useState(false);
  const [qrCodeModalToggle, setQrCodeModalToggle] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [selectedDates, setSelectedDates] = useState([new Date()]);

  useEffect(() => {
    handleEventsUpdate(0);
  }, []);

  const handlePageChange = (data) => {
    const newPage = data.selected;
    const offset = newPage * eventsPerPage;
    setPage(newPage);
    handleEventsUpdate(offset);
  };

  const handleEventsUpdate = (offset, dates = selectedDates) => {
    getByDrivingSchool(dates, eventsPerPage, offset).then(({ data }) =>
      setEvents(data)
    );
  };

  const handleFormToggle = (id) => {
    setSelectedEventId(id);
    setFormToggle(!formToggle);
  };

  const handleQrCodeModalToggle = (id) => {
    setSelectedEventId(id);
    setQrCodeModalToggle(!qrCodeModalToggle);
  };

  const handleDayClick = (day, { selected }) => {
    const newDate = new Date(day);
    const currentSelectedDates = [...selectedDates];
    if (selected) {
      const selectedIndex = currentSelectedDates.findIndex((date) =>
        DateUtils.isSameDay(date, newDate)
      );
      currentSelectedDates.splice(selectedIndex, 1);
    } else {
      currentSelectedDates.push(newDate);
    }
    setSelectedDates(currentSelectedDates);
    setPage(0);
    handleEventsUpdate(0, currentSelectedDates);
  };

  const handleEventDelete = () => {
    eventToDelete &&
      deleteEvent(eventToDelete.id).then(() => {
        setEventToDelete(null);
        handleEventsUpdate(page * eventsPerPage);
      });
  };

  return (
    <>
      <main className="admin-events">
        <SectionSeperator
          title="Events"
          button="+ Add"
          buttonClickHandler={handleFormToggle}
        />
        <div className="admin-events__container">
          <EventList
            events={events}
            formToggleHandler={handleFormToggle}
            qrCodeModalToggleHandler={handleQrCodeModalToggle}
            eventsPerPage={eventsPerPage}
            pageChangeHandler={handlePageChange}
            setEventToDelete={setEventToDelete}
            page={page}
          />
          <DayPicker
            onDayClick={handleDayClick}
            selectedDays={selectedDates}
            select
          />
        </div>
      </main>
      {selectedDates && selectedDates.length > 0 && (
        <Modal
          title={selectedEventId ? "Edit event" : "Add event"}
          toggle={formToggle}
          toggleHandler={handleFormToggle}>
          <EventForm
            formToggleHandler={handleFormToggle}
            eventsUpdateHandler={handleEventsUpdate}
            selectedEventId={selectedEventId}
            dates={selectedDates}
          />
        </Modal>
      )}

      <Modal
        title="QR Code"
        toggle={qrCodeModalToggle}
        toggleHandler={handleQrCodeModalToggle}>
        <QRCodeModal selectedEventId={selectedEventId} />
      </Modal>
      <Dialog
        title="Delete event"
        toggle={eventToDelete}
        toggleHandler={() => setEventToDelete()}
        actionHandler={handleEventDelete}>
        Are you sure you want to delete this event?
      </Dialog>
    </>
  );
};

export default AdminEvents;
