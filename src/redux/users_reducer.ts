import { AppStateType } from './redux_store';
import { PhotosType, UserType } from './../types/types';
import { userAPI } from "../api/api.ts";
import { updateObjectInArray } from "../utils/utils2";
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const SET_FETCHING = "SET_FETCHING"
const FOLLOWING_IN_PROGRESS = "FOLLOWING_IN_PROGRESS"




type UsersArrayType = {
  items: Array<UserType>,
  totalCount: number,
  error: string | null
}

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, //array of User ID
  followed: false //for block follow/unfollow button
};

export type InitialStateType = typeof initialState
// let initialStateType = typeof {
//   users: [],
//   pageSize: 10,
//   totalUsersCount: 0,
//   currentPage: 1,
//   isFetching: false,
//   followingInProgress: [],
//   followed: false

// };

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, "id", { followed: true })
      }

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, "id", { followed: false })
      }


    case SET_USERS:
      return {
        ...state,
        users: action.users,
      }

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }

    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      }

    case SET_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      }

    case FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress.filter(id => id != action.userID)
      }



    default:
      return state;
  }
};

type ActionsTypes = FollowAcceptType | UnfollowAcceptType
  | SetUsersActionType | SetCurrentPageActionType
  | SetTotalUsersCountActionType | SetFetchingActionType
  | SetFollowingActionType


type FollowAcceptType = {
  type: typeof FOLLOW,
  userID: number
}
export const followAccept = (userID: number): FollowAcceptType => (
  { type: FOLLOW, userID: userID });

type UnfollowAcceptType = {
  type: typeof UNFOLLOW,
  userID: number
}

export const unfollowAccept = (userID: number): UnfollowAcceptType => (
  { type: UNFOLLOW, userID: userID });

export type SetUsersActionType = {
  type: typeof SET_USERS,
  users: Array<UserType>
}

export const setUsers = (users: Array<UserType>): SetUsersActionType => (
  { type: SET_USERS, users });

export type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE,
  currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => (
  { type: SET_CURRENT_PAGE, currentPage: currentPage });


export type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT,
  totalUsersCount: number
}
export const setTotalUsersCount = (count: number): SetTotalUsersCountActionType => (
  { type: SET_TOTAL_USERS_COUNT, totalUsersCount: count });

export type SetFetchingActionType = {
  type: typeof SET_FETCHING,
  isFetching: boolean
}
export const setFetching = (isFetching: boolean): SetFetchingActionType => (
  { type: SET_FETCHING, isFetching: isFetching });

export type SetFollowingActionType = {
  type: typeof FOLLOWING_IN_PROGRESS,
  isFetching: boolean,
  userID: number
}
export const setFollowing = (isFetching: boolean, userID: number): SetFollowingActionType => (
  { type: FOLLOWING_IN_PROGRESS, isFetching, userID });


//Thunks
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUsers = (currentPage: number,
  pageSize: number): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(setFetching(true));
    dispatch(setCurrentPage(currentPage));
    let data = await userAPI.getUsers(currentPage, pageSize);
    dispatch(setFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  }
}

const followUnfollowFlow = async (
      dispatch: Dispatch<ActionsTypes>,
      userID: number,
      apiMethod: any,
      actionCreator: (userID: number) => FollowAcceptType | UnfollowAcceptType ) => {
    dispatch(setFollowing(true, userID))

    let data = await apiMethod(userID);

    if (data.resultCode === 0) {
      dispatch(actionCreator(userID))
    }
    dispatch(setFollowing(false, userID))
  }


export const follow = (userID: number): ThunkType  => {
  return async (dispatch) => {
    let apiMethod = userAPI.followUser.bind(userAPI);
    let actionCreator = followAccept

    followUnfollowFlow(dispatch, userID, apiMethod, actionCreator)
  }
}

export const unfollow = (userID: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = userAPI.unfollowUser.bind(userAPI);
    let actionCreator = unfollowAccept

    followUnfollowFlow(dispatch, userID, apiMethod, actionCreator)
  }
}


export default usersReducer;
