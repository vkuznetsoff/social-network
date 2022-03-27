
import React from "react";
import s from "./Users.module.css"
import axios from "axios"

const photoURL = 'https://www.showmarker.com/wp-content/uploads/sites/40/shutterstock_1123987313.jpg'

const Users = (props) => {

  let getUsers = () => {
    if (props.users.length === 0) {
      axios.get("https://social-network.samuraijs.com/api/1.0/users").then( response => {
        
          props.setUsers(response.data.items)
        } )

  }
  }
  
  return <div> 
    <button onClick={getUsers} >Get Users</button>
    {
    props.users.map(u => <div key={u.id}>
      <span>
        <div>
          <img src={u.photos.small != null ? u.photos.small : u.photos.small= photoURL} className={s.usersPhoto} />
        </div>

        <div>
          {u.followed
            ? <button onClick={() => { props.unfollow(u.id) }} >Follow</button>
            : <button onClick={() => { props.follow(u.id) }} >UnFollow</button>}
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

    </div>)
  }

  </div>;
};

export default Users
