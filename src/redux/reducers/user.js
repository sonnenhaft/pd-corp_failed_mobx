import {
  REMOVE_CURRENT_USER,
  SET_CURRENT_USER
} from './../constants'

const initialState = {name: 'John Smith'}

export const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.payload
    case REMOVE_CURRENT_USER:
      return null
    default:
      return state
  }
}
