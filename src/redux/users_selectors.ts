//import { createSelector, createSelectorCreator } from 'reselect'

import { AppStateType } from "./redux_store"

export const getUsersFromState = (state: AppStateType)  => {
    return state.usersPage.users
}

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage= (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching= (state: AppStateType) => {
    return state.usersPage.isFetching
}
  
export const getFollowingInProgress= (state: AppStateType) => {
    return state.usersPage.followingInProgress
}
