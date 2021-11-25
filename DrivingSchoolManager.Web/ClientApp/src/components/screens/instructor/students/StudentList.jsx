import React, { useState, useEffect } from "react";

import SectionSeperator from "../../../helpers/SectionSeperator";
import Student from "./Student";
import { getInstructorUsers } from "../../../../services/users";

const StudentList = ({ setSelectedStudentId }) => {
  const [instructorStudents, setInstructorStudents] = useState({});

  useEffect(() => {
    getInstructorUsers().then((response) =>
      setInstructorStudents(response.data)
    );
  }, []);

  if (instructorStudents === undefined || instructorStudents.length === 0)
    return <p>Loading...</p>;

  return (
    <>
      <SectionSeperator title="Students" />
      <section className="students__list">
        {instructorStudents.length >= 1 ? (
          instructorStudents.map((student, index) => (
            <Student
              key={index}
              student={student}
              setSelectedStudentId={setSelectedStudentId}
            />
          ))
        ) : (
          <p>No students</p>
        )}
      </section>
    </>
  );
};

export default StudentList;
