import React from "react";
import "../../styles/common/_section-seperator.scss";

const SectionSeperator = ({ title, button, buttonClickHandler }) => (
  <div className="seperator">
    <span className="seperator__title">{title}</span>
    <div className="seperator__line" />
    {button && (
      <button
        className="seperator__button"
        onClick={() => buttonClickHandler()}
      >
        {button}
      </button>
    )}
  </div>
);

export default SectionSeperator;
