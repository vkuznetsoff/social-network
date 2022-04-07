import { connect } from "react-redux";
import {
  setCurrentPage,
  setFetching,
  setTotalUsersCount,
  setUsers,
  follow,
  unfollow,
  setFollowing,
  getUsers,
} from "../../redux/users_reducer.ts";
import Users from "./Users.tsx";
import Preloader from "../Preloader/Preloader";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsersFromState,
} from "../../redux/users_selectors";
import React from "react";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux_store";

type PropsType = {
  pageSize: number;
  currentPage: number;
  isFetching: boolean;
  totalUsersCount: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  isAuth: boolean;
  follow: () => void;
  unfollow: () => void;
  getUsers: (currentPage: number, pageSize: number) => void;
};

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (page: number) => {
    this.props.getUsers(page, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching && <Preloader />}

        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
          isAuth={this.props.isAuth}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {

    users: getUsersFromState(state), //в компоненту User это свойство придёт через props
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    setFetching,
    setFollowing,
    getUsers,
    follow,
    unfollow,
  }),
  withAuthRedirect
)(UsersContainer);
