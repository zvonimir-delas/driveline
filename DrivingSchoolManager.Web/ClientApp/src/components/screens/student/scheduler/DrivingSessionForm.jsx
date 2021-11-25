import React, { useState, useEffect } from "react";
import { getDrivingSchoolById } from "../../../../services/drivingSchools";
import { appointDrivingSession } from "../../../../services/drivingSessions";

import Map from "../../../helpers/Map";
import CloseIcon from "../../../../assets/icons/exit.svg";

const DrivingSessionForm = ({
  scheduleUpdateHandler,
  drivingSessionId,
  drivingSchoolId,
  formToggleHandler,
  appointedDrivingSessionsUpdateHandler,
}) => {
  const [drivingSchoolCoordinates, setDrivingSchoolCoordinates] = useState({});
  const [markerCoordinates, setMarkerCoordinates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDrivingSchoolById(drivingSchoolId).then((data) => {
      const coordinates = { lng: data.xCoordinate, lat: data.yCoordinate };
      setMarkerCoordinates(coordinates);
      setDrivingSchoolCoordinates(coordinates);
      setLoading(false);
    });
  }, []);

  const handleCoordinatesChange = (event) => {
    const { lat, lng } = event.latLng;

    setMarkerCoordinates({ lat: lat(), lng: lng() });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { lng, lat } = markerCoordinates;

    appointDrivingSession({
      id: drivingSessionId,
      xCoordinate: lng,
      yCoordinate: lat,
    }).then(() => {
      formToggleHandler();
      scheduleUpdateHandler();
      appointedDrivingSessionsUpdateHandler();
    });
  };

  return (
    <form className="modal__form" onSubmit={(e) => handleFormSubmit(e)}>
      {!loading && (
        <Map
          draggable={true}
          defaultCenter={drivingSchoolCoordinates}
          markerPosition={markerCoordinates}
          coordinatesChangeHandler={handleCoordinatesChange}
        />
      )}
      <div className="modal__actions">
        <button className="modal__button">Submit</button>
      </div>
    </form>
  );
};

export default DrivingSessionForm;
