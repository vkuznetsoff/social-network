import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "SET_USER_DATA";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL"

// export type InitialStateType = {
//   id: number | null,
//   email: string | null,
//   login: string | null,
//   isAuth: boolean,
//   isFetching: boolean,
//   captchaUrl: string | null
// };

let initialState = {
  id: null as number | null,
  email:  null as string | null,
  login:  null as string | null,
  isAuth: false,
  isFetching: false,
  captchaUrl:  null as string | null
};

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any) : InitialStateType => {
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

type SetUserAuthPayloadDataType = { 
  id: number | null, 
  email: string | null, 
  login: string | null, 
  isAuth: boolean 
}

type SetUserAuthDataType = {
  type: typeof SET_USER_DATA,
  payload:  SetUserAuthPayloadDataType
};

export const setUserAuthData = (
  id: number | null, email: string | null, 
  login: string | null, isAuth: boolean): SetUserAuthDataType => {
  return {
    type: SET_USER_DATA,
    payload: { id, email, login, isAuth },
  };
};


type SetCaptchaUrlType = {
  type: typeof SET_CAPTCHA_URL,
  url: string
};

export const setCaptchaUrl = (url:string) : SetCaptchaUrlType => {
  return {
    type: SET_CAPTCHA_URL,
    url: url
  };
};


export const getAuth = () => async (dispatch: any) => {
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

export const login = (
  email: string, password: string, 
  rememberMe: boolean, captcha: string) => async (dispatch: any) => {

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

export const logout = () => async (dispatch: any) => {
  let response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setUserAuthData(null, null, null, false));
  }
};

export const getCaptcha = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptchaUrl();
  const url = response.data.url;
  dispatch(setCaptchaUrl(url))

};

export default authReducer;
