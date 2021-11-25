import React from "react";

import Prices from "./Prices";

const DrivingSchoolInfo = ({ drivingSchool }) => (
  <>
    <section className="details__info">
      <h1 className="info__name">{drivingSchool.name}</h1>
      <p className="info__description">
        {drivingSchool.description}
      </p>
      <div className="info__container">
        <div className="container__contact">
          <h3 className="contact__title">Contact</h3>
          <p className="contact__info">City: {drivingSchool.city}</p>
          <p className="contact__info">Adress: {drivingSchool.location}</p>
          <p className="contact__info">Number: {drivingSchool.phoneNumber}</p>
          <p className="contact__info">Email: {drivingSchool.email}</p>
        </div>
        <Prices priceItems={drivingSchool.priceItems} />
      </div>
      <div className="container__work-hours">
        <h3 className="work-hours__title">Work hours</h3>
        <p className="work-hours__info">Monday - Friday: {drivingSchool.workDayStart} - {drivingSchool.workDayEnd}</p>
        <p className="work-hours__info">Saturday: {drivingSchool.weekendStart} - {drivingSchool.weekendEnd}</p>
      </div>
    </section>
  </>
);

export default DrivingSchoolInfo;
