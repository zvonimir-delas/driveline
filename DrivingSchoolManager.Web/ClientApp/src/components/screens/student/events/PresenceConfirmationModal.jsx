import React from "react";
import axios from "axios";
import QrReader from "react-qr-reader";

const PresenceConfirmationModal = ({
  modalToggleHandler,
  eventsUpdateHandler,
}) => {
  const handleScan = (result) => {
    if (result) {
      axios.get(result).then(() => {
        eventsUpdateHandler();
        modalToggleHandler();
      });
    }
  };

  return (
    <QrReader
      delay={25}
      onScan={(result) => handleScan(result)}
      onError={() => modalToggleHandler()}
      facingMode="environment"
    />
  );
};

export default PresenceConfirmationModal;
