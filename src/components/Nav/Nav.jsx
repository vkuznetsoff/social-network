import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Nav.module.css";

const setActive = (navData) => (navData.isActive ? s.active : s.item);

const Nav = () => {
  let imgPath =
    "https://www.clipartkey.com/mpngs/m/310-3105768_greg-yates-section-300-chairperson-low-voltage-metering.png";
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to="/profile" className={setActive}>
          Profile
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/dialogs" className={setActive}>
          Messages
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/news" className={setActive}>
          News
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/music" className={setActive}>
          Music
        </NavLink>
      </div>

      <div className={s.item}>
        <NavLink to="/users" className={setActive}>
          Users
        </NavLink>
      </div>

      <div className={s.item}>
        <NavLink to="/settings" className={setActive}>
          Settings
        </NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/friends" className={setActive}>
          Friends
        </NavLink>

        <div className={s.friendsNav}>
          <div className={s.friendsNavItem}>
            <img src={imgPath} />
            image1
          </div>

          <div class={s.friendsNavItem}>
            <img src={imgPath} />
            image2
          </div>

          <div class={s.friendsNavItem}>
            <img src={imgPath} />
            image3
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
