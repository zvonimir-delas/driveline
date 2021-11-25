import React from "react";

import StudentImage from "../../../../assets/images/default-profile-image.jpg";
import EmailIcon from "../../../../assets/icons/email.svg";
import PhoneIcon from "../../../../assets/icons/phone.svg";

const Student = ({ student, setSelectedStudentId }) => {
  return (
    <figure className="students__student">
      <img
        src={student.imageUri ?? StudentImage}
        alt="Student"
        className="students__image"
      />
      <figcaption className="students__data">
        <h2 className="students__fullname">
          {student.firstName} {student.lastName}
        </h2>
        <div className="students__data-container">
          <img
            src={EmailIcon}
            alt="Email icon"
            className="students__data-icon"
          />
          <a href={`email:${student.email}`} className="students__data">
            {student.email}
          </a>
        </div>
        <div className="students__data-container">
          <img
            src={PhoneIcon}
            alt="Email icon"
            className="students__data-icon"
          />
          <a href={`tel:"${student.phoneNumber}`} className="students__data">
            {student.phoneNumber}
          </a>
        </div>
        <button
          onClick={() => setSelectedStudentId(student.id)}
          className="students__button">
          Show sessions
        </button>
      </figcaption>
    </figure>
  );
};

export default Student;
