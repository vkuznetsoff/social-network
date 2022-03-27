
import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import Paginator from "./Paginator";
import s from "./Users.module.css"


const photoURL = 'https://www.showmarker.com/wp-content/uploads/sites/40/shutterstock_1123987313.jpg'

const User = (props) => {
  let u = props.user

  return <div>
    <span>
      <div>
        <NavLink to={"/profile/" + u.id}>

          <img src={u.photos.small != null ? u.photos.small : u.photos.small = photoURL}
            className={s.usersPhoto} />
        </NavLink>

      </div>

      <div>
        {u.followed

          ? <button disabled={props.followingInProgress.some(id => id === u.id)}
            onClick={() => { props.unfollow(u.id) }}>Follow</button>

          : <button disabled={props.followingInProgress.some(id => id === u.id)}
            onClick={() => { props.follow(u.id) }} > UnFollow</button>}
      </div>

    </span>

    <span>
      <span>
        <div>{u.name}</div>
        <div>{u.status} </div>

      </span>

      <span>
        <div>{"u.location.city"} </div>
        <div> {"u.location.country"}  </div>
      </span>
    </span>
  </div>
}
export default User
