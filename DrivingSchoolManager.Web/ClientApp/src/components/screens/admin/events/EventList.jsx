import React from "react";
import ReactPaginate from "react-paginate";

import Event from "../../common/Event";

const EventList = ({
  events,
  qrCodeModalToggleHandler,
  eventsPerPage,
  pageChangeHandler,
  page,
  setEventToDelete,
}) => {
  return (
    <section className="admin-events__list">
      {events.data.map((event, index) => (
        <div className="admin-events__event-container">
          <Event key={index} event={event} direction="horizontal" />
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
      ))}
      <ReactPaginate
        forcePage={page}
        pageCount={Math.ceil(events.count / eventsPerPage)}
        onPageChange={pageChangeHandler}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        containerClassName="pagination"
        pageClassName="pagination__page"
        activeClassName="pagination__page pagination__page--active"
        nextClassName="pagination__action"
        disabledClassName="pagination__action--disabled"
        previousClassName="pagination__action"
        breakClassName="pagination__break"
      />
    </section>
  );
};

export default EventList;
