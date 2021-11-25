import React, { useState, useEffect } from "react";

import "../../../../styles/screens/instructor/_profile.scss";
import SectionSeperator from "../../../helpers/SectionSeperator";
import ProfileInfo from "../../common/ProfileInfo";
import Schedule from "../../common/Schedule";
import InstructorLayout from "../../../layouts/InstructorLayout";
import AppointedSessionForm from "./AppointedSessionForm";
import PendingSessionForm from "./PendingSessionForm";
import { getUser, getInstructorSchedule } from "../../../../services/users";
import { groupDrivingSessions } from "../../../../utils/schedule";
import drivingSessionStatus from "../../../../constants/drivingSessionStatus";
import Modal from "../../../helpers/Modal";

const InstructorProfile = () => {
  const [instructor, setInstructor] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [selectedDrivingSession, setSelectedDrivingSession] = useState({
    id: null,
  });
  const [formToggle, setFormToggle] = useState(false);

  useEffect(() => {
    getUser().then(({ data }) => {
      setInstructor(data);
      handleScheduleUpdate(data.id);
    });
  }, []);

  const handleScheduleUpdate = (id) => {
    getInstructorSchedule(id).then(({ data }) => {
      setSchedule(groupDrivingSessions(data));
    });
  };

  const handleFormToggle = (drivingSession) => {
    if (drivingSession) setSelectedDrivingSession(drivingSession);
    else
      setSelectedDrivingSession((currentDrivingSession) => ({
        ...currentDrivingSession,
        id: null,
      }));
    setFormToggle(!formToggle);
  };

  return (
    <>
      <InstructorLayout />
      <main className="profile">
        <div className="profile__user-rating-container">
          <ProfileInfo user={instructor} />
        </div>
        <SectionSeperator
          title="Schedule"
          button="+ Add"
          buttonClickHandler={handleFormToggle}
        />
        <Schedule
          schedule={schedule}
          drivingSessionClickHandler={handleFormToggle}
        />
      </main>
      {((selectedDrivingSession &&
        selectedDrivingSession.status === drivingSessionStatus.pending) ||
        !selectedDrivingSession.id) && (
        <Modal
          title={
            selectedDrivingSession.id ? "Edit appointment" : "Add appointment"
          }
          toggle={formToggle}
          toggleHandler={() => handleFormToggle()}>
          <PendingSessionForm
            drivingSessionId={selectedDrivingSession.id}
            formToggleHandler={handleFormToggle}
            scheduleUpdateHandler={() => handleScheduleUpdate(instructor.id)}
          />
        </Modal>
      )}
      {selectedDrivingSession &&
        selectedDrivingSession.status === drivingSessionStatus.appointed && (
          <Modal
            title="Appointment"
            toggle={formToggle}
            toggleHandler={() => handleFormToggle(null)}>
            <AppointedSessionForm
              drivingSessionId={selectedDrivingSession.id}
              formToggleHandler={handleFormToggle}
              scheduleUpdateHandler={() => handleScheduleUpdate(instructor.id)}
            />
          </Modal>
        )}
    </>
  );
};

export default InstructorProfile;
