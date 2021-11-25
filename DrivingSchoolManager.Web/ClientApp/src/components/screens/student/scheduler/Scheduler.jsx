import React, { useState, useEffect } from "react";

import Modal from "../../../helpers/Modal";
import SectionSeperator from "../../../helpers/SectionSeperator";
import StudentLayout from "../../../layouts/StudentLayout";
import DrivingSessionForm from "./DrivingSessionForm";
import InstructorInfo from "../../common/ProfileInfo";
import DrivingLessons from "./DrivingLessons";
import Schedule from "../../common/Schedule";
import {
  getUser,
  getUserById,
  getInstructorSchedule,
  getAppointedDrivingSessions,
} from "../../../../services/users";
import { groupDrivingSessions } from "../../../../utils/schedule";

const Scheduler = () => {
  const [user, setUser] = useState({});
  const [instructor, setInstructor] = useState({});
  const [instructorLoading, setInstructorLoading] = useState(true);
  const [selectedDrivingSession, setSelectedDrivingSession] = useState(null);
  const [upcomingDrivingSessions, setUpcomingDrivingSessions] = useState([]);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    getUser().then(({ data }) => {
      setUser(data);
      getUserById(data.instructorId).then(({ data }) => {
        setInstructor(data);
        setInstructorLoading(false);
      });
      handleAppointedDrivingSessionsUpdate(data.id);
      handleScheduleUpdate(data.instructorId);
    });
  }, []);

  const handleScheduleUpdate = (instructorId) => {
    getInstructorSchedule(instructorId).then(({ data }) => {
      setSchedule(groupDrivingSessions(data));
    });
  };

  const handleAppointedDrivingSessionsUpdate = (studentId) => {
    getAppointedDrivingSessions(studentId).then(({ data }) => {
      setUpcomingDrivingSessions(data);
    });
  };

  const handleFormToggle = (drivingSession = {}) => {
    if (drivingSession.status === "Pending" || !drivingSession.status)
      setSelectedDrivingSession(drivingSession.id);
  };

  return (
    <>
      <StudentLayout />
      <main className="profile">
        <div className="profile__info-events-container">
          {!instructorLoading && <InstructorInfo user={instructor} />}
          {upcomingDrivingSessions.length > 0 && (
            <DrivingLessons drivingLessons={upcomingDrivingSessions} />
          )}
        </div>
        <SectionSeperator title="Schedule" />
        <Schedule
          schedule={schedule}
          drivingSessionClickHandler={handleFormToggle}
        />
      </main>
      <Modal
        title="Appointment"
        toggle={selectedDrivingSession}
        toggleHandler={handleFormToggle}>
        <DrivingSessionForm
          drivingSessionId={selectedDrivingSession}
          drivingSchoolId={user.drivingSchoolId}
          formToggleHandler={handleFormToggle}
          scheduleUpdateHandler={() => handleScheduleUpdate(instructor.id)}
          appointedDrivingSessionsUpdateHandler={() =>
            handleAppointedDrivingSessionsUpdate(user.id)
          }
        />
      </Modal>
    </>
  );
};

export default Scheduler;
