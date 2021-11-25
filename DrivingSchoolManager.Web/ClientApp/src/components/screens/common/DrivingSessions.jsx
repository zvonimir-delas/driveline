import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import "../../../styles/common/_driving-sessions.scss";

import Map from "../../helpers/Map";

import { getDrivingSessionsByStudentId } from "../../../services/drivingSessions";

const DrivingSessions = ({ selectedStudentId }) => {
  const mapRef = useRef(null);
  const [drivingSessions, setDrivingSessions] = useState([]);
  const [selectedDrivingSession, setSelectedDrivingSession] = useState(null);

  useEffect(() => {
    getDrivingSessionsByStudentId(selectedStudentId).then(({ data }) => {
      setDrivingSessions(data);
    });
  }, []);

  const handleDrivingSessionSelect = (drivingSession) => {
    setSelectedDrivingSession(drivingSession);
    mapRef.current.panTo(
      new window.google.maps.LatLng({
        lng: drivingSession.locationLogs[0].xCoordinate,
        lat: drivingSession.locationLogs[0].yCoordinate,
      })
    );
  };

  return (
    <div className="driving-sessions">
      <Map
        mapRef={mapRef}
        defaultCenter={{
          lng: selectedDrivingSession
            ? selectedDrivingSession.locationLogs[0].xCoordinate
            : 16.453417,
          lat: selectedDrivingSession
            ? selectedDrivingSession.locationLogs[0].yCoordinate
            : 43.513614,
        }}
        draggable
        coordinatesChangeHandler={() => {}}
        path={selectedDrivingSession && selectedDrivingSession.locationLogs}
      />

      <div className="driving-sessions__list">
        {drivingSessions.map((drivingSession) => (
          <div
            key={drivingSession.id}
            onClick={() => handleDrivingSessionSelect(drivingSession)}
            className={`driving-sessions__driving-session driving-sessions__driving-session--selected`}>
            <div className="driving-sessions__number">Driving session</div>
            <div className="driving-sessions__date">
              {drivingSession.locationLogs[0] &&
                moment(drivingSession.locationLogs[0].timestamp).format(
                  "yyyy/DD/mm"
                )}{" "}
              {drivingSession.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrivingSessions;
