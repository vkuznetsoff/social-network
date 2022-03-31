import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL"

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: false,
  captchaUrl: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
        isAuth: true,
      };

    case SET_CAPTCHA_URL:
      return {
        ...state,
        captchaUrl: action.url
      };

    default:
      return state;
  }
};

export const setUserAuthData = (id, email, login, isAuth) => {
  return {
    type: SET_USER_DATA,
    payload: { id, email, login, isAuth },
  };
};

export const setCaptchaUrl = (url) => {
  return {
    type: SET_CAPTCHA_URL,
    url
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

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {

  let response = await authAPI.login(email, password, rememberMe, captcha);
  debugger
  if (response.data.resultCode === 0) {
    dispatch(getAuth());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptcha())
    }
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

export const getCaptcha = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const url = response.data.url;
  dispatch(setCaptchaUrl(url))

};

export default authReducer;
