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
} from "../../redux/users_selectors.ts";
import React from "react";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux_store";
import { SetCurrentPageActionType, SetFetchingCountActionType, SetFollowingActionType, SetTotalUsersCountActionType, SetUsersActionType } from "../../redux/users_reducer";

type MapStatePropsType = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  totalUsersCount: number;
  users: Array<UserType>;
  followingInProgress: Array<number>;

}

type MapDispatchPropsType = {
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  getUsers: (currentPage: number, pageSize: number) => void;
  // setUsers: (users: Array<UserType>) => SetUsersActionType
  // setCurrentPage: (currentPage: number) => SetCurrentPageActionType,
  // setTotalUsersCount: (count: number) => SetTotalUsersCountActionType,
  // setFetching: (isFetching: boolean) => SetFetchingCountActionType,
  // setFollowing: (isFetching: boolean, userID: number) => SetFollowingActionType,   

}

type OwnPropsType = {
  pageTitle: string,
  isAuth: boolean
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

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
        <h1>{this.props.pageTitle}</h1>
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

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
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
  //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    getUsers,
    follow,
    unfollow,
  }),
  withAuthRedirect
)(UsersContainer);
