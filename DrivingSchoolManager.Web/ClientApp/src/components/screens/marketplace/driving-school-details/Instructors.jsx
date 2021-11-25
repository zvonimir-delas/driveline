import React from "react";

import SectionSeperator from "../../../helpers/SectionSeperator";
import Instructor from "./Instructor";

const Instructors = ({ instructors, instructorReviewsModalToggleHandler }) => {
  if (instructors === undefined) return <p>Error</p>;

  return (
    <section className="details__instructors">
      <SectionSeperator title="Instructors" />
      <div className="instructors__list">
        {instructors.length === 0 ? (
          <p>Nema podataka o instruktoru.</p>
        ) : (
          instructors.map((instructor, index) => (
            <Instructor
              key={index}
              instructor={instructor}
              instructorReviewsModalToggleHandler={() =>
                instructorReviewsModalToggleHandler(instructor.id)
              }
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Instructors;
