import React, { useState, useEffect } from "react";
import { getUser, getStudentStats } from "../../../../services/users";
import {
  setDidStudentReview,
  getDidStudentReview,
} from "../../../../utils/localStorage";

import SectionSeperator from "../../../helpers/SectionSeperator";
import StudentLayout from "../../../layouts/StudentLayout";
import StudentInfo from "../../common/ProfileInfo";
import StudentProgress from "./StudentProgress";
import ReviewModal from "./ReviewModal";
import DrivingSessions from "../../common/DrivingSessions";
import Modal from "../../../helpers/Modal";

const StudentProfile = () => {
  const [student, setStudent] = useState();
  const [studentStats, setStudentStats] = useState({});
  const [reviewModalToggle, setReviewModalToggle] = useState(true);

  useEffect(() => {
    getUser().then(({ data }) => {
      setStudent(data);
      console.log(data);
      getStudentStats(data.id).then(({ data }) => {
        setStudentStats(data);
      });
    });
  }, []);

  const handleReviewModalToggle = () => {
    setReviewModalToggle(!reviewModalToggle);
  };

  return (
    <>
      <StudentLayout />
      <main className="profile">
        <div className="profile__info-events-container">
          {student && <StudentInfo user={student} />}
        </div>
        <SectionSeperator title="Progress" />
        {studentStats.progress !== undefined && student.category && (
          <StudentProgress
            studentCategory={student.category}
            studentStats={studentStats}
          />
        )}
        {student && <DrivingSessions selectedStudentId={student.id} />}
      </main>
      {!getDidStudentReview() && (
        <Modal
          title="Review"
          toggle={reviewModalToggle}
          toggleHandler={handleReviewModalToggle}>
          <ReviewModal reviewModalToggleHandler={handleReviewModalToggle} />
        </Modal>
      )}
    </>
  );
};

export default StudentProfile;
