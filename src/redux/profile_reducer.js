import { profileAPI, userAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const DELETE_POST = "DELETE_POST";
//const UPDATE_POST = "UPDATE-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS";
const LOAD_PHOTO_SUCCESS = "LOAD_PHOTO_SUCCESS";

let initialState = {
  posts: [
    { id: 1, text: "Good day to live", likeCount: 2 },
    { id: 2, text: "Something else", likeCount: 12 },
    { id: 3, text: "Skoobi-doo", likeCount: 10 },
  ],

  //newPostText: "some text",
  profile: null,
  status: ""
};

const profileReducer = (state = initialState, action) => {
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
      return { ...state, profile: {...state.profile, photos: action.photos}};

    default:
      return state;
  }
};

export const addPostActionCreator = (newposttext) => ({ type: ADD_POST, newposttext });

export const postDeleteAC = (postID) => ({ type: DELETE_POST, postID });

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status, });

export const loadPhotoSuccess = (photos) => ({
  type: LOAD_PHOTO_SUCCESS,
  photos
});


//Thunk
export const getUserProfile = (userID) => async (dispatch) => {
  let response = await userAPI.getProfile(userID);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userID) => async (dispatch) => {
  let response = await profileAPI.getUserStatus(userID);
  dispatch(setUserStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (response.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
};

export const savePhoto = (file) => async (dispatch) => {
  let response = await profileAPI.loadPhoto(file);
  if (response.resultCode === 0) {
    dispatch(loadPhotoSuccess(response.data));
  }
};


export default profileReducer;
