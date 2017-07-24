import {
  REMOVE_CURRENT_USER,
  SET_CURRENT_USER
} from './constants'

export const setCurrentUser = payload => ({ type: SET_CURRENT_USER, payload })
export const removeCurrentUser = payload => ({ type: REMOVE_CURRENT_USER, payload })
