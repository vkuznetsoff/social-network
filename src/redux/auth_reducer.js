import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
        isAuth: true,
      };

    default:
      return state;
  }
};

export const setUserAuthData = (id, email, login, isAuth) => {
  //debugger
  return {
    type: SET_USER_DATA,
    payload: { id, email, login, isAuth },
  };
};

export const getAuth = () => async (dispatch) => {
  let response = await authAPI.me();

  if (response.data.resultCode === 0) {
    dispatch(
      setUserAuthData(
        response.data.data.id,
        response.data.data.email,
        response.data.data.login,
        true
      )
    );
  }

};

export const login = (email, password, rememberMe) => async (dispatch) => {

  let response = await authAPI.login(email, password, rememberMe);

  if (response.data.resultCode === 0) {
    dispatch(getAuth());
  } else {

    let message = response.data.messages
      ? response.data.messages[0]
      : "Some error";

    dispatch(
      stopSubmit("login", {
        _error: message,
      })
    );
  }

};

export const logout = () => async (dispatch) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setUserAuthData(null, null, null, false));
  }

};

export default authReducer;
