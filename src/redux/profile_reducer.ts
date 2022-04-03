import { UserPostsType, PhotosType } from './../types/types';
import { stopSubmit } from "redux-form";
import { profileAPI, userAPI } from "../api/api";
import { ProfileType } from "../types/types";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const LOAD_PHOTO_SUCCESS = "LOAD_PHOTO_SUCCESS";
const SAVE_PROFILE_SUCCESS = "SAVE_PROFILE_SUCCESS";


let initialState = {
  posts: [
    { id: 1, text: "Good day to live", likeCount: 2 },
    { id: 2, text: "Something else", likeCount: 12 },
    { id: 3, text: "Skoobi-doo", likeCount: 10 },
  ] as Array<UserPostsType>,

  profile: null as ProfileType | null,
  status: ""
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        text: action.newposttext,
        likeCount: 0,
      };

      let stateCopy = {
        ...state,
        posts: [...state.posts, newPost],
      };

      return stateCopy;
    }

    case DELETE_POST:
      return { ...state, posts: state.posts.filter(p => p.id != action.postID) };

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };

    case SET_USER_STATUS:
      return { ...state, status: action.status };

    case LOAD_PHOTO_SUCCESS:
      return { ...state, profile: { ...state.profile, photos: action.photos } };

    case SAVE_PROFILE_SUCCESS:
      return { ...state, profile: action.profile };

    default:
      return state;
  }
};

type AddPostActionCreatorType = {
  type: typeof ADD_POST, 
  newposttext: string
}


export const addPostActionCreator = (newposttext: string): AddPostActionCreatorType => (
  { type: ADD_POST, newposttext });

type SetUserProfileType = {
  type: typeof SET_USER_PROFILE,
  profile: ProfileType,
}

export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
  type: SET_USER_PROFILE,
  profile,
});

type SetUserStatusType = {
  type: typeof SET_USER_STATUS, 
  status: string
}

export const setUserStatus = (status: string): SetUserStatusType => (
  { type: SET_USER_STATUS, status });

type  PostDeleteActionType = {
  type: typeof DELETE_POST, 
  postID: number
}
export const postDeleteAC = (postID: number): PostDeleteActionType => (
  { type: DELETE_POST, postID });


type LoadPhotoSuccessType = {
  type: typeof LOAD_PHOTO_SUCCESS,
  photos: PhotosType
}
export const loadPhotoSuccess = (photos: PhotosType): LoadPhotoSuccessType => ({
  type: LOAD_PHOTO_SUCCESS,
  photos
});

type SaveProfileSuccess = {
  type: typeof SAVE_PROFILE_SUCCESS,
  profile: ProfileType
}

export const saveProfileSuccess = (profile: ProfileType): SaveProfileSuccess => ({
  type: SAVE_PROFILE_SUCCESS,
  profile
});


//Thunk
export const getUserProfile = (userID: number) => async (dispatch: any) => {
  let response = await userAPI.getProfile(userID);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userID: number) => async (dispatch: any) => {
  let response = await profileAPI.getUserStatus(userID);
  dispatch(setUserStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  let response = await profileAPI.updateStatus(status);
  if (response.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  let response = await profileAPI.loadPhoto(file);

  if (response.data.resultCode === 0) {
    dispatch(loadPhotoSuccess(response.data.data.photos));
  }
};

export const saveProfile = (profile: ProfileType, userID: number) => async (dispatch: any) => {

  let response = await profileAPI.saveProfile(profile);
  // debugger
  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userID));
  } else {

    dispatch(
      stopSubmit("editProfile", {
        _error: response.data.messages[0]
      })
    )
    return Promise.reject(response.data.messages[0])
  }
};


export default profileReducer;
