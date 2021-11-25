import React from "react";

import "../../../styles/screens/student/_profile.scss";
import StudentImage from "../../../assets/images/default-profile-image.jpg";
import PhoneIcon from "../../../assets/icons/phone.svg";
import EmailIcon from "../../../assets/icons/email.svg";
import CategoryIcon from "../../../assets/icons/category.svg";

const ProfileInfo = ({ user }) => {
  return (
    <figure className="user">
      <img src={user.imageUri ?? StudentImage} alt="Profile" className="user__image" />
      <figcaption>
        <p className="user__fullname">
          {user.firstName} {user.lastName}
        </p>
        <div className="user__data-container">
          <img src={EmailIcon} className="user__icon" alt="Icon" />
          <a href={`mailto:${user.email}`} className="user__data">
            {user.email}
          </a>
        </div>
        <div className="user__data-container">
          <img src={PhoneIcon} className="user__icon" alt="Icon" />
          <a href={`tel:${user.phoneNumber}`} className="user__data">
            {user.phoneNumber}
          </a>
        </div>
        <div className="user__data-container">
          <img src={CategoryIcon} className="user__icon" alt="Icon" />
          <span className="user__data">{user.category}</span>
        </div>
      </figcaption>
    </figure>
  );
};

export default ProfileInfo;
