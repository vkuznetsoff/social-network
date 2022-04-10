import React from "react";
import { NavLink } from "react-router-dom";
import s from "./../Dialogs.module.css";

type PropsType = {
  text: string
}



const MessageItem: React.FC<PropsType> = ({text}) => {
  return <div className={s.messageItem}>{text}</div>;
};


export default MessageItem;
