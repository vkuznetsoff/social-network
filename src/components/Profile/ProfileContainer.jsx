
import React from "react";

import { connect } from "react-redux";
import Profile from "./Profile";
import { getUserProfile, getStatus, updateStatus } from "../../redux/profile_reducer"
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { withRouter } from "../../hoc/withrouter";


// export const GetIdFromUrl = () => {
//   const  {id} = useParams();

//   return {id}
// }

class ProfileContainer extends React.Component {

  componentDidMount() {

    let userID = this.props.match.params.userID
    
    if (!userID) {
      userID = this.props.authUserID
    }

    this.props.getUserProfile(userID);
    this.props.getStatus(userID);

  }

  render() {

    return (

      <Profile {...this.props} profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        />

    );

  }
};

let mapStateToProps = (state) => {

  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    authUserID: state.auth.id

  }
};

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
  
  withRouter,
  withAuthRedirect
)(ProfileContainer)



