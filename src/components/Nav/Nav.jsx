import React from "react";
import { NavLink } from "react-router-dom";
import { NO_PROFILE_IMAGE } from "../../img/img";
import s from "./Nav.module.css";

const setActive = (navData) => (navData.isActive ? s.active : s.item);

const Nav = () => {
  
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink to="/profile/22694" className={setActive}>
          MyPage
        </NavLink>
      </div>
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
            <img src={NO_PROFILE_IMAGE} />
            image1
          </div>

          <div class={s.friendsNavItem}>
            <img src={NO_PROFILE_IMAGE} />
            image2
          </div>

          <div class={s.friendsNavItem}>
            <img src={NO_PROFILE_IMAGE} />
            image3
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
