import React from "react";
import { Link, useHistory } from "react-router-dom";

import "../../styles/layouts/_header.scss";
import Logo from "../../assets/icons/logo.png";
import CalendarIcon from "../../assets/icons/calendar.svg";
import UserIcon from "../../assets/icons/user.svg";
import RoadIcon from "../../assets/icons/road.svg";
import LogoutIcon from "../../assets/icons/logout.svg";

const StudentHeader = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.replace("/login");
  };

  return (
    <>
      <header className="header">
        <div className="header__wrapper">
          <img src={Logo} alt="Logo" className="header__logo" />
          <nav className="header__nav">
            <Link to="/student/profile" className="header__link">
              Profile
            </Link>
            <Link to="/student/events" className="header__link">
              Events
            </Link>
            <Link to="/student/scheduler" className="header__link">
              Scheduler
            </Link>
            <button
              className="header__link header__link--button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <footer className="footer">
        <div className="footer__wrapper">
          <nav className="footer__nav">
            <Link to="/student/profile" className="footer__link">
              <img src={UserIcon} alt="Car icon" className="footer__icon" />
            </Link>
            <Link to="/student/events" className="footer__link">
              <img
                src={CalendarIcon}
                alt="User icon"
                className="footer__icon"
              />
            </Link>
            <Link to="/student/scheduler" className="footer__link">
              <img src={RoadIcon} alt="User icon" className="footer__icon" />
            </Link>
            <img
              src={LogoutIcon}
              alt="User icon"
              className="footer__icon"
              onClick={handleLogout}
            />
          </nav>
        </div>
      </footer>
    </>
  );
};

export default StudentHeader;
