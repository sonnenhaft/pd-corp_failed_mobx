import * as actions from '../{name}.actions.js'

const initialState = {
  list: null, listError: null, listLoading: false,
  activeItem: { item: null, error: null, loading: false },
  newItem: { item: null, error: null, creating: true }
}

const updateList = (state, _id, obj, action) => {
  const list = state.list.slice()
  const idx = list.findIndex(({ id }) => id === _id)
  if ( action === 'adding' ) {
    list.push(obj)
  } else {
    if (idx === -1) {
      throw new Error(`Can't work on "${action} {name}" - not found`)
    }
    if ( action === 'removing' ) {
      list.splice(idx, 1)
    } else {
      list[idx] = { ...list[idx], ...obj }
    }
  }

  return { ...state, list }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.{NAME}_FETCH_LIST:
      return { ...state, list: null, listError: null, listLoading: true }
    case actions.{NAME}_FETCH_LIST_SUCCESS:
      return { ...state, list: action.pyload.data, listError: null, listLoading: false }
    case actions.{NAME}_FETCH_LIST_FAILURE:
      return { ...state, listError: action.payload, listLoading: true }

    case actions.{NAME}_FETCH:
      return updateList(state, action.payload.id, { error: null, loading: true })
    case actions.{NAME}_FETCH_SUCCESS:
      return updateList(state, action.payload.id, { ...action.payload.data, error: null, loading: false })
    case actions.{NAME}_FETCH_FAILURE:
      return updateList(state, action.payload.id, { error: action.payload.data, loading: false })

    case actions.{NAME}_CREATE:
      return { ...state, newItem: action.payload, creatingError: null, creating: true }
    case actions.{NAME}_CREATE_SUCCESS:
      return { ...state, newItem: null, creatingError: null, creating: false }
    case actions.{NAME}_CREATE_FAILURE:
      return { ...state, creatingError: action.payload.data, creating: false }

    case actions.{NAME}_UPDATE:
      return updateList(state, action.payload.id, { ...action.payload.data, error: null, loading: true })
    case actions.{NAME}_UPDATE_SUCCESS:
      return updateList(state, action.payload.id, { error: null, loading: false })
    case actions.{NAME}_UPDATE_FAILURE:
      return updateList(state, action.payload.id, { error: action.payload.data, loading: false })

    case actions.{NAME}_DELETE:
      return updateList(state, action.payload, { error: null, loading: true })
    case actions.{NAME}_DELETE_SUCCESS:
      return updateList(state, action.payload, null, 'removing')
    case actions.{NAME}_DELETE_FAILURE:
      return updateList(state, action.payload.id, { error: action.payload.data, loading: false })

    default:
      return state
  }
}
