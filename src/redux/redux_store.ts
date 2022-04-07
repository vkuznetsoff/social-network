

import { applyMiddleware, combineReducers } from "redux";
import createStore from "redux/src/createStore";
import authReducer from "./auth_reducer.ts";
import dialogReducer from "./dialogs_reducer.ts";
import profileReducer from "./profile_reducer.ts";
import sidebarReducer from "./sidebar_reducer.ts";
import usersReducer from "./users_reducer.ts";
import thunkMiddleWare from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app_reducer.ts";


let RootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducerType = typeof RootReducer

export type AppStateType = ReturnType<RootReducerType>

let store = createStore(RootReducer, applyMiddleware(thunkMiddleWare));

//@ts-ignore
window.store = store

export default store;