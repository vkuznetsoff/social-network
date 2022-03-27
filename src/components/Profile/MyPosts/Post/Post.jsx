import React from "react";
import s from "./Posts.module.css";

const Posts = (props) => {
  return (
    <div className={s.item}>
      <img  src="https://astroliudmila.ru/wp-content/uploads/2018/12/%D0%9B%D0%B5%D0%BE%D0%BD%D0%B0%D1%80%D0%B4%D0%BE-%D0%B4%D0%B8-%D0%9A%D0%B0%D0%BF%D1%80%D0%B8%D0%BE-e1544517806855.jpg" />
      {props.text}
      <div>
        <span>{props.likeCount} like</span>
      </div>
      
    </div>
  );
};

export default Posts;
