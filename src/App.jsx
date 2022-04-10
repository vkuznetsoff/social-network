import React from "react";
import styles from "./App.module.css";
import Nav from "./components/Nav/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer.tsx";
//import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

import Login from "./components/Login/Login";
import { connect } from "react-redux";
import { compose } from "redux";
import { appInit } from "./redux/app_reducer.ts"
import Preloader from "./components/Preloader/Preloader";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer.tsx"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))

class App extends React.Component {

  componentDidMount() {
    this.props.appInit()
  }

  render() {

    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <BrowserRouter>

        <div className={styles.appWrapper}>
          <HeaderContainer />
          <Nav />
          <div className={styles.appWrapperContent}>
            <Routes>
              <Route path='/profile/:userID' element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ProfileContainer />
                </React.Suspense>
              } />

              <Route path='/dialogs/*' element={
                <React.Suspense fallback={<div>Loading...</div>}>
                  <DialogsContainer />
                </React.Suspense>
              } />

              <Route path="/users" element={<UsersContainer pageTitle={"SocialNW"} />} />

              <Route path="/music" element={<Music />} />

              <Route path="/news" element={<News />} />

              <Route path="/settings" element={<Settings />} />

              <Route path="/login" element={<Login />} />

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    )




  }

}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})


export default compose(
  //withRouter,
  connect(mapStateToProps, { appInit })
)
  (App);
