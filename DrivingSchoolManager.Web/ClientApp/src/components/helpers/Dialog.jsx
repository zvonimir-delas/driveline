import React from "react";
import Modal from "./Modal";

const Dialog = ({ title, toggle, toggleHandler, actionHandler, children }) => {
  return (
    <Modal title={title} toggle={toggle} toggleHandler={toggleHandler}>
      <p className="modal__text">{children}</p>
      <div className="modal__actions">
        <button onClick={actionHandler} className="modal__button ">
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default Dialog;
