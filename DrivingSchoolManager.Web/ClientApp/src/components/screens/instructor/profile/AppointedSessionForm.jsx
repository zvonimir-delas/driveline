import React, { useState, useRef, useEffect } from "react";
import {
  getDrivingSessionById,
  finishDrivingSession,
  cancelDrivingSession,
} from "../../../../services/drivingSessions";
import {
  setTrackedPath,
  getTrackedPath,
  removeTrackedPath,
} from "../../../../utils/localStorage";
import { dataURLtoFile } from "../../../../utils/image";

import SignatureCanvas from "react-signature-canvas";

import UserImage from "../../../../assets/images/default-profile-image.jpg";
import PhoneIcon from "../../../../assets/icons/phone.svg";

import Map from "../../../helpers/Map";
import Rating from "../../../helpers/Rating";

const InstructorForm = ({
  drivingSessionId,
  formToggleHandler,
  scheduleUpdateHandler,
}) => {
  const [path, setPath] = useState({
    data: [],
    isTracking: false,
    isFinished: false,
  });
  const signatureRef = useRef({});
  const [navigatorId, setNavigatorId] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [drivingSession, setDrivingSession] = useState({});
  const [drivingSessionLoading, setDrivingSessionLoading] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const trackedPath = getTrackedPath(drivingSessionId);

    if (trackedPath) setPath(trackedPath);
    else setTrackedPath(path, drivingSessionId);

    drivingSessionId &&
      getDrivingSessionById(drivingSessionId).then(({ data }) => {
        setDrivingSession(data);
        setDrivingSessionLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isTracking && !navigatorId) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          let currentPath = getTrackedPath(drivingSessionId);
          if (!currentPath) currentPath = path;
          const newPath = {
            ...currentPath,
            data: [
              ...currentPath.data,
              {
                xCoordinate: position.coords.longitude,
                yCoordinate: position.coords.latitude,
                timestamp: position.timestamp,
              },
            ],
          };
          setTrackedPath(newPath, drivingSessionId);
          setPath(newPath);
          console.log(newPath);
        },
        (err) => err,
        { enableHighAccuracy: true }
      );
      setNavigatorId(id);
    }
    if (!isTracking && navigatorId) {
      window.clearInterval(navigatorId);
      setNavigatorId(null);
    }
  }, [isTracking]);

  const handleFinishTracking = () => {
    let currentPath = getTrackedPath(drivingSessionId);
    setTrackedPath({ ...currentPath, isFinished: true }, drivingSessionId);
    setPath({ ...currentPath, isFinished: true });
    setIsTracking(false);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSessionCancel = () => {
    cancelDrivingSession(drivingSessionId).then(() => {
      formToggleHandler();
      scheduleUpdateHandler();
    });
  };

  const handleFormSubmit = () => {
    const b64Signature = signatureRef.current
      .getTrimmedCanvas()
      .toDataURL("image/png");
    const locationLogs = path.data;
    const signature = dataURLtoFile(b64Signature, "signature");
    locationLogs.forEach((log) => (log.timestamp = new Date(log.timestamp)));

    finishDrivingSession({
      drivingSessionId,
      signature,
      locationLogs,
      rating: parseInt(rating),
    }).then(() => {
      formToggleHandler();
      scheduleUpdateHandler();
      removeTrackedPath(drivingSessionId);
    });
  };

  return (
    <>
      {!drivingSessionLoading ? (
        <>
          <figure className="modal__user">
            <img src={UserImage} alt="User" className="user__image" />
            <figcaption className="user__caption">
              <span className="user__fullname">
                {drivingSession.student.firstName}{" "}
                {drivingSession.student.lastName}
              </span>
              <div className="user__data-container">
                <img src={PhoneIcon} className="user__icon" alt="Icon" />
                <a
                  href={`tel:${drivingSession.student.phoneNumber}`}
                  className="user__data">
                  {drivingSession.student.phoneNumber}
                </a>
              </div>
            </figcaption>
          </figure>

          <Map
            defaultCenter={{
              lng: drivingSession.xCoordinate,
              lat: drivingSession.yCoordinate,
            }}
            markerPosition={{
              lng: drivingSession.xCoordinate,
              lat: drivingSession.yCoordinate,
            }}
            draggable={false}
            coordinatesChangeHandler={() => {}}
            path={path.data}
            isTracking={true}
          />

          {path.isFinished && (
            <>
              <SignatureCanvas
                ref={signatureRef}
                penColor="black"
                canvasProps={{ className: "modal__signature-pad" }}
              />
              <div className="modal__rating">
                <Rating
                  editable={true}
                  value={rating}
                  size={25}
                  valueChangeHandler={handleRatingChange}
                />
              </div>
            </>
          )}

          <div className="modal__actions">
            {!isTracking && !path.isFinished && (
              <>
                <button
                  className="modal__button"
                  onClick={() => setIsTracking(true)}>
                  Start
                </button>
                <button
                  className="modal__button modal__button--red"
                  onClick={handleSessionCancel}>
                  Cancel
                </button>
              </>
            )}
            {isTracking && !path.isFinished && (
              <button className="modal__button" onClick={handleFinishTracking}>
                Stop
              </button>
            )}
            {path.isFinished && (
              <button
                type="submit"
                value="Submit"
                className="modal__button"
                onClick={handleFormSubmit}>
                Finish
              </button>
            )}
          </div>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
};

export default InstructorForm;
