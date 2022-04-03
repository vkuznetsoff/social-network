import { userAPI } from "../api/api";
import { updateObjectInArray } from "../utils/utils2";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const SET_FETCHING = "SET_FETCHING"
const FOLLOWING_IN_PROGRESS = "FOLLOWING_IN_PROGRESS"


let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
  followed: false

};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, "id", {followed: true})
      }

    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, "id", {followed: false})
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

export const followAccept = (userID) => ({ type: FOLLOW, userID: userID });
export const unfollowAccept = (userID) => ({ type: UNFOLLOW, userID: userID });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage: currentPage });
export const setTotalUsersCount = (count) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount: count });
export const setFetching = (isFetching) => ({ type: SET_FETCHING, isFetching: isFetching });
export const setFollowing = (isFetching, userID) => ({ type: FOLLOWING_IN_PROGRESS, isFetching, userID });

export const getUsers = (currentPage, pageSize) => {

  return async (dispatch) => {
    dispatch(setFetching(true));
    dispatch(setCurrentPage(currentPage));

    let data = await userAPI.getUsers(currentPage, pageSize);
    dispatch(setFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  }
}

const followUnfollowFlow = async (dispatch, userID, apiMethod, actionCreator) => {
  dispatch(setFollowing(true, userID))

  let data = await apiMethod(userID);

  if (data.resultCode === 0) {
    dispatch(actionCreator(userID))
  }
  dispatch(setFollowing(false, userID))
}


export const follow = (userID) => {
  return async (dispatch) => {
    let apiMethod = userAPI.followUser.bind(userAPI);
    let actionCreator = followAccept

    followUnfollowFlow(dispatch, userID, apiMethod, actionCreator)
  }
}

export const unfollow = (userID) => {
  return async (dispatch) => {
    let apiMethod = userAPI.unfollowUser.bind(userAPI);
    let actionCreator = unfollowAccept

    followUnfollowFlow(dispatch, userID, apiMethod, actionCreator)
  }
}


export default usersReducer;
