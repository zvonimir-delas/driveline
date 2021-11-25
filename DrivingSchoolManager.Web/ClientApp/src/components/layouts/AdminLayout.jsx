import React from "react";
import { Link, useHistory } from "react-router-dom";

import Logo from "../../assets/icons/logo.png";
import UserIcon from "../../assets/icons/user.svg";
import UsersIcon from "../../assets/icons/users.svg";
import CalendarIcon from "../../assets/icons/calendar.svg";
import LogoutIcon from "../../assets/icons/logout.svg";

const AdminLayout = () => {
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
            <Link to="/admin/users" className="header__link">
              Users
            </Link>
            <Link to="/admin/groups" className="header__link">
              Groups
            </Link>
            <Link to="/admin/events" className="header__link">
              Events
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
            <Link to="/admin/users" className="footer__link">
              <img src={UserIcon} alt="User icon" className="footer__icon" />
            </Link>
            <Link to="/admin/groups" className="footer__link">
              <img src={UsersIcon} alt="Groups icon" className="footer__icon" />
            </Link>
            <Link to="/admin/events" className="footer__link">
              <img
                src={CalendarIcon}
                alt="User icon"
                className="footer__icon"
              />
            </Link>
            <button onClick={handleLogout}>
              <img src={LogoutIcon} alt="User icon" className="footer__icon" />
            </button>
          </nav>
        </div>
      </footer>
    </>
  );
};

export default AdminLayout;
