import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";
import { getAuth } from "./auth_reducer";

const SET_INITIALIZED = "SET_INITIALIZED";
const INIT_SUCCESS = "INIT_SUCCESS";


let initialState = {
  initialized: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return {
        ...state,
        initialized: action.initialized,
      };

      case INIT_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};


export const setInitialized = (flag) => {
  //debugger
  return {
    type: SET_INITIALIZED,
    initialized: flag,
  };
};

export const initSuccess = () => {
  //debugger
  return {
    type: INIT_SUCCESS,
  };
};


export const appInit = () => (dispatch) => {
  let promise = dispatch(getAuth())

  promise.then(() => {dispatch(initSuccess())} )
}



export default appReducer;
