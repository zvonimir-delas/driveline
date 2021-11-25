import React, { useState } from "react";

import "../../../../styles/screens/instructor/_students.scss";
import Modal from "../../../helpers/Modal";
import InstructorLayout from "../../../layouts/InstructorLayout";
import StudentList from "./StudentList";

import DrivingSessions from "../../common/DrivingSessions";

const Students = () => {
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  return (
    <>
      <InstructorLayout />
      <main className="students">
        <StudentList setSelectedStudentId={setSelectedStudentId} />
      </main>
      <Modal
        title="Driving sessions"
        toggle={selectedStudentId}
        toggleHandler={() => setSelectedStudentId()}>
        <DrivingSessions selectedStudentId={selectedStudentId} />
      </Modal>
    </>
  );
};

export default Students;
