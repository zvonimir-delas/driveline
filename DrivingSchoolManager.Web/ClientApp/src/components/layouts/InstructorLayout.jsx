import React from "react";
import { Link, useHistory } from "react-router-dom";

import Logo from "../../assets/icons/logo.png";
import UserIcon from "../../assets/icons/user.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import UsersIcon from "../../assets/icons/users.svg";
import LogoutIcon from "../../assets/icons/logout.svg";

const InstructorHeader = () => {
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
            <Link to="/instructor/profile" className="header__link">
              Profile
            </Link>
            <Link to="/instructor/events" className="header__link">
              Events
            </Link>
            <Link to="/instructor/students" className="header__link">
              Students
            </Link>
            <button
              className="header__link header__link--button"
              onClick={handleLogout}>
              Logout
            </button>
          </nav>
        </div>
      </header>

      <footer className="footer">
        <div className="footer__wrapper">
          <nav className="footer__nav">
            <Link to="/instructor/profile" className="footer__link">
              <img src={UserIcon} alt="Car icon" className="footer__icon" />
            </Link>
            <Link to="/instructor/events" className="footer__link">
              <img
                src={CalendarIcon}
                alt="Calendar icon"
                className="footer__icon"
              />
            </Link>
            <Link to="/instructor/students" className="footer__link">
              <img
                src={UsersIcon}
                alt="Students icon"
                className="footer__icon"
              />
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

export default InstructorHeader;
