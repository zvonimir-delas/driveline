import React, { useState, useEffect } from "react";
import "../../../../styles/screens/marketplace/_driving-school-details.scss";

import { getDrivingSchoolById } from "../../../../services/drivingSchools";
import DrivingSchoolImage from "../../../../assets/images/driving-school-placeholder.jpg";
import MarketplaceLayout from "../../../layouts/MarketplaceLayout";
import DrivingSchoolInfo from "./DrivingSchoolInfo";
import Instructors from "./Instructors";
import Reviews from "./Reviews";
import InstructorReviewsModal from "./InstructorReviewsModal";
import Modal from "../../../helpers/Modal";

const DrivingSchoolDetails = (props) => {
  const [drivingSchool, setDrivingSchool] = useState({});
  const [
    instructorReviewsModalToggle,
    setInstructorReviewsModalToggle,
  ] = useState(false);
  const [selectedInstructorId, setSelectedInstructorId] = useState(null);

  useEffect(() => {
    getDrivingSchoolById(props.match.params.id).then((data) =>
      setDrivingSchool(data)
    );
  }, []);

  const handleInstructorReviewsModalToggle = (id = null) => {
    setSelectedInstructorId(id);
    setInstructorReviewsModalToggle(!instructorReviewsModalToggle);
  };

  if (drivingSchool === undefined) return <h1>Error</h1>;

  return (
    <>
      <MarketplaceLayout />
      <main className="driving-school">
        <img
          src={drivingSchool.imageUri ?? DrivingSchoolImage}
          alt="Driving school"
          className="driving-school__image"
        />
        <section className="driving-school__details">
          <DrivingSchoolInfo drivingSchool={drivingSchool} />
          <Instructors
            instructors={drivingSchool.instructors}
            instructorReviewsModalToggleHandler={
              handleInstructorReviewsModalToggle
            }
          />
          <Reviews reviews={drivingSchool.reviews} />
        </section>
        <Modal
          title="Instructor reviews"
          toggle={instructorReviewsModalToggle}
          toggleHandler={() => handleInstructorReviewsModalToggle()}>
          <InstructorReviewsModal selectedInstructorId={selectedInstructorId} />
        </Modal>
      </main>
    </>
  );
};

export default DrivingSchoolDetails;
