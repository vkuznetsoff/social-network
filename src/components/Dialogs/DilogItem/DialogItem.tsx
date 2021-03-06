import React from "react";
import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";

type PropsType = {
id: number,
name: string
}

const setActive = (Data) => (Data.isActive ? s.active : s.dialogItem);

const DialogItem: React.FC<PropsType> = ({id, name}) => {
  let path = "/dialogs/" + id;
  return (
    <div className={s.dialogItem}>
      <img src="https://e7.pngegg.com/pngimages/442/17/png-clipart-computer-icons-user-profile-male-user-heroes-head.png" />

      <NavLink to={path} className={setActive}>
        {name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
