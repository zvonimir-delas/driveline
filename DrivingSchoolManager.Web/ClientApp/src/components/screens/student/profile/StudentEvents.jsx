import React, { useState, useEffect } from "react";

import SectionSeperator from "../../../helpers/SectionSeperator";
import StudentEvent from "./StudentEvent";
import RoadIcon from "../../../../assets/icons/road-inverted.svg";
import FirstAidIcon from "../../../../assets/icons/medkit-inverted.svg";
import RegulationsIcon from "../../../../assets/icons/warning-inverted.svg";
import { getUserExams } from "../../../../services/users";

const StudentEvents = () => {
  const [firstAidExam, setFirstAidExam] = useState(null);
  const [regulationsExam, setRegulationsExam] = useState(null);
  const [drivingTest, setDrivingTest] = useState(null);

  useEffect(() => {
    getUserExams().then((response) => {
      setFirstAidExam(
        response.data.filter((e) => e.type === "FirstAidExam")[0]
      );
      setRegulationsExam(
        response.data.filter((e) => e.type === "RegulationsExam")[0]
      );
      setDrivingTest(response.data.filter((e) => e.type === "DrivingTest")[0]);
    });
  }, []);

  return (
    <section className="profile__events">
      <SectionSeperator title="Events" direction="reverse" />
      <div className="events__list">
        {firstAidExam === null ? (
          <StudentEvent
            title="First Aid"
            description=""
            result="Panding..."
            icon={FirstAidIcon}
            eventStyle="events__event--red"
          />
        ) : (
          <StudentEvent
            title={firstAidExam.name}
            description="Lorem ipsum dolor sit amet"
            result={
              firstAidExam.points !== null
                ? `${firstAidExam.points} / ${firstAidExam.totalPoints}`
                : "Uncomplete"
            }
            icon={FirstAidIcon}
            eventStyle="events__event--red"
          />
        )}

        {regulationsExam === null ? (
          <StudentEvent
            title="Regulations"
            description="Lorem ipsum dolor sit amet"
            result="Panding..."
            icon={RegulationsIcon}
            eventStyle="events__event--yellow"
          />
        ) : (
          <StudentEvent
            title={regulationsExam.name}
            description="Lorem ipsum dolor sit amet"
            result={
              regulationsExam.points !== null
                ? `${regulationsExam.points} / ${regulationsExam.totalPoints}`
                : "Uncomplete"
            }
            icon={RegulationsIcon}
            eventStyle="events__event--yellow"
          />
        )}

        {drivingTest === null ? (
          <StudentEvent
            title="Driving"
            description="Lorem ipsum dolor sit amet ............ ......"
            result="Panding..."
            icon={RoadIcon}
            eventStyle="events__event--blue"
          />
        ) : (
          <StudentEvent
            title={drivingTest.name}
            description="Lorem ipsum dolor sit amet ............ ......"
            result={
              drivingTest.points !== null || drivingTest.points === 1
                ? "Completed"
                : "Uncomplete"
            }
            icon={RoadIcon}
            eventStyle="events__event--blue"
          />
        )}
      </div>
    </section>
  );
};

export default StudentEvents;
