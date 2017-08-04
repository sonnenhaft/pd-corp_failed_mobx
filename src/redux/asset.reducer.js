import * as actions from './asset.actions.js'

import { generateDemoTable } from 'common'
const labels = [
  { label: 'id', key: 'id' },
  { label: 'Asset Number', key: 'asset_name' },
  { label: 'Asset Type', key: 'asset_type' },
  { label: 'RFID Number', key: 'rfid' },
  { label: 'Bar Code Number', key: 'barCode' },
  { label: 'Serial Number', key: 'serialNumber' },
  { label: 'Asset/Equipment Number', key: 'assetNumber' },
  { label: 'Owner/Department', key: 'owner' },
  { label: 'Manufacturer', key: 'manufacturer' },
  { label: 'Model', key: 'model' },
  { label: 'Description', key: 'description' },
  { label: 'Location', key: 'location' },
  { label: 'Notes', key: 'notes' },
  { label: 'Status', key: 'status' }
]

const data = generateDemoTable(labels)

const initialState = {
  list: data, listError: null, listLoading: false,
  newItem: { item: null, error: null, creating: true }
}

const updateList = (state, _id, obj, action) => {
  const list = state.list.slice()
  const idx = list.findIndex(({ id }) => id === _id)
  if ( action === 'adding' ) {
    list.push(obj)
  } else {
    if ( idx === -1 ) {
      throw new Error(`Can't work on "${action} asset" - not found`)
    }
    if ( action === 'removing' ) {
      list.splice(idx, 1)
    } else {
      list[idx] = { ...list[idx], ...obj }
    }
  }

  return { ...state, list }
}

let matches
export default (state = initialState, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      matches = /\/assets\/(edit|view)\/(.*)/.exec(action.payload.pathname)
      if ( matches && matches[2] !== state.activeId ) {
        return { ...state, activeId: matches[2] }
      } else {
        return state
      }
    case actions.ASSET_FETCH_LIST:
      return { ...state, list: null, listError: null, listLoading: true }
    case actions.ASSET_FETCH_LIST_SUCCESS:
      return { ...state, list: action.pyload.data, listError: null, listLoading: false }
    case actions.ASSET_FETCH_LIST_FAILURE:
      return { ...state, listError: action.payload, listLoading: true }

    case actions.ASSET_FETCH:
      return updateList(state, action.payload.id, { error: null, loading: true })
    case actions.ASSET_FETCH_SUCCESS:
      return updateList(state, action.payload.id, { ...action.payload.data, error: null, loading: false })
    case actions.ASSET_FETCH_FAILURE:
      return updateList(state, action.payload.id, { error: action.payload.data, loading: false })

    case actions.ASSET_CREATE:
      return { ...state, newItem: action.payload, creatingError: null, creating: true }
    case actions.ASSET_CREATE_SUCCESS:
      return { ...state, newItem: null, creatingError: null, creating: false }
    case actions.ASSET_CREATE_FAILURE:
      return { ...state, creatingError: action.payload.data, creating: false }

    case actions.ASSET_UPDATE:
      return updateList(state, action.payload.id, { ...action.payload.data, error: null, loading: true })
    case actions.ASSET_UPDATE_SUCCESS:
      return updateList(state, action.payload.id, { ...action.payload.data, error: null, loading: false })
    case actions.ASSET_UPDATE_FAILURE:
      return updateList(state, action.payload.id, { error: action.payload.data, loading: false })

    case actions.ASSET_DELETE:
      return updateList(state, action.payload.id, { error: null, loading: true })
    case actions.ASSET_DELETE_SUCCESS:
      return updateList(state, action.payload, null, 'removing')
    case actions.ASSET_DELETE_FAILURE:
      return updateList(state, action.payload.id, { error: action.payload.data, loading: false })

    default:
      return state
  }
}
