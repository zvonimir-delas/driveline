import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getDrivingSchoolRating } from "../../../../services/drivingSchools";
import { roundRating } from "../../../../utils/rating";
import Rating from "../../../helpers/Rating";
import LocationIcon from "../../../../assets/icons/location.svg";
import EmailIcon from "../../../../assets/icons/email.svg";
import DrivingSchoolImage from "../../../../assets/images/driving-school-placeholder.jpg";

const DrivingSchool = ({ drivingSchool }) => {
  const [rating, setRating] = useState(0.0);

  useEffect(() => {
    if (drivingSchool != null)
      getDrivingSchoolRating(drivingSchool.id).then((data) =>
        setRating(roundRating(data))
      );
  }, [drivingSchool]);

  return (
    <figure className="list__driving-school">
      <Link to={`/marketplace/${drivingSchool.id}`}>
        <img
          src={drivingSchool.imageUri ?? DrivingSchoolImage}
          alt="Driving school"
          className="driving-school__image"></img>
      </Link>
      <figcaption className="driving-school__caption">
        <div className="caption__info">
          <span className="info__name">{drivingSchool.name}</span>
          <div className="info__location">
            <img
              src={LocationIcon}
              alt="Location icon"
              className="location__icon"
            />
            <span className="location__text">{drivingSchool.location}</span>
          </div>
          <div className="info__email">
            <img src={EmailIcon} alt="Email icon" className="email__icon" />
            <span className="email__text">{drivingSchool.email}</span>
          </div>
        </div>
        <Rating value={rating} editable={false} />
      </figcaption>
    </figure>
  );
};

export default DrivingSchool;
