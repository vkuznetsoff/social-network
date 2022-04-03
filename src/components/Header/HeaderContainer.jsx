
import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import {getAuth, logout} from "../../redux/auth_reducer.ts"




class HeaderContainer extends React.Component {
  
  render() {
    return <Header {...this.props}  />
  }
}

let mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login

  }
}
export default connect(mapStateToProps, {getAuth, logout}) (HeaderContainer)