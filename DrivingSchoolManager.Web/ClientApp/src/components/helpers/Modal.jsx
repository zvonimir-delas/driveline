import React, { useEffect } from "react";
import "../../styles/common/_modal.scss";

import CloseIcon from "../../assets/icons/exit.svg";

const Modal = ({ title, toggle, toggleHandler, children }) => {
  useEffect(() => {
    toggle
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [toggle]);

  return (
    (toggle && (
      <>
        <div className="background-overlay" onClick={toggleHandler} />
        <div className="modal">
          <div className="modal__header">
            <h2 className="modal__title">{title}</h2>
            <button onClick={toggleHandler}>
              <img src={CloseIcon} alt="Close icon" className="modal__close" />
            </button>
          </div>
          {children}
        </div>
      </>
    )) ||
    null
  );
};

export default Modal;
