import React from "react";
import { Link } from "react-router-dom";
import "../../styles/layouts/_header.scss";

import UserIcon from "../../assets/icons/user.svg";
import DrivingSchoolIcon from "../../assets/icons/driving-school.svg";

const MarketplaceHeader = () => (
  <>
    <header className="header header--absolute">
      <div className="header__wrapper header__wrapper--right-orientation">
        <nav className="header__nav">
          <Link to="/marketplace" className="header__link header__link--white">
            Marketplace
          </Link>
          <Link to="/login" className="header__link header__link--button">
            Login
          </Link>
        </nav>
      </div>
    </header>

    <footer className="footer">
      <div className="footer__wrapper">
        <nav className="footer__nav">
          <Link to="/marketplace" className="footer__link">
            <img
              src={DrivingSchoolIcon}
              alt="Car icon"
              className="footer__icon"
            />
          </Link>
          <Link to="/login" className="footer__link">
            <img src={UserIcon} alt="User icon" className="footer__icon"></img>
          </Link>
        </nav>
      </div>
    </footer>
  </>
);

export default MarketplaceHeader;
