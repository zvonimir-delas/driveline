import React from "react";

import ProgressBar from "./ProgressBar";

const StudentProgress = ({ studentCategory, studentStats }) => {
  return (
    <section className="profile__progress">
      <ProgressBar
        studentCategory={studentCategory}
        studentStats={studentStats}
      />
    </section>
  );
};

export default StudentProgress;
