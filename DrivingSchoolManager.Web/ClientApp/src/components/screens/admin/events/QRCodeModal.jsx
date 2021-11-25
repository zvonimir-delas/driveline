import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";

import { endpoints } from "../../../../services/config";
import { getEventById } from "../../../../services/events";

const QRCodeModal = ({ selectedEventId }) => {
  const [eventUrl, setEventUrl] = useState(null);

  useEffect(() => {
    getEventById(selectedEventId).then(({ data }) => {
      setEventUrl(`${endpoints.events.confirmPresence}/${data.guid}`);
    });
  }, []);

  return (
    <>
      {eventUrl && (
        <QRCode value={eventUrl} style={{ width: "100%", height: "auto" }} />
      )}
    </>
  );
};

export default QRCodeModal;
