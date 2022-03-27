import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css"


const Header = (props) => {
  
  const onLogout = () => {
    debugger
    props.logout()
  }

  return <header className={s.header}>
    {/* <img scr='https://cdn.comu.edu.tr/cms/egitimfak/foto/1-15210340581.png' alt='description1222' /> */}
   
    <img
      src="https://sssvu.minobr63.ru/wp-content/uploads/2017/03/4-496.jpg"
      alt="pic1"
    ></img>

    <div className={s.loginblock}>
      
    {props.isAuth
    ? <div> <NavLink to={'#'} >{props.login}</NavLink>  <button onClick={onLogout}> LogOUT</button></div> 
    : <NavLink to={'/login'} >Sigh in</NavLink> }
      
    </div>



  </header>

}

export default Header