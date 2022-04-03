// import { getAuth } from './auth_reducer';

import { getAuth } from "./auth_reducer.ts";

const SET_INITIALIZED = "SET_INITIALIZED";
const INIT_SUCCESS = "INIT_SUCCESS";


export type InitialStateType = {
  initialized: boolean

}

let initialState: InitialStateType = {
  initialized: false
};



const appReducer = (state = initialState, action: any): InitialStateType => {
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


type InitSuccessType = {
  type: typeof INIT_SUCCESS
}

export const initSuccess = () : InitSuccessType => {
  return {
    type: INIT_SUCCESS,
  };
};


export const appInit = () => (dispatch: any) => {
  let promise = dispatch(getAuth())

  promise.then(() => { dispatch(initSuccess()) })
}



export default appReducer;
