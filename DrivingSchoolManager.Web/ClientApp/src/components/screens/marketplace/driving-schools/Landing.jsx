import React from "react";

import SearchIcon from "../../../../assets/icons/search.svg";
import SettingsIcon from "../../../../assets/icons/settings.svg";
import Logo from "../../../../assets/icons/logo-inverted.png";

const Landing = ({
  filtersToggle,
  filtersClickHandler,
  handleChangeSearch,
  handleSearchClick,
}) => (
  <section className="marketplace__landing">
    <video className="landing__video" autoPlay muted loop>
      <source src="covervideo.mp4" type="video/mp4" />
    </video>
    {/*<div className="landing__overlay" />*/}
    <div className="landing__content">
      <img src={Logo} className="content__title" />
      <div className="content__search">
        <input
          type="text"
          placeholder="Autoškola"
          className="search__input"
          onChange={handleChangeSearch}
        />
        <img
          src={SearchIcon}
          alt="Search icon"
          className="search__icon"
          onClick={handleSearchClick}
        />
      </div>
    </div>
  </section>
);

export default Landing;
