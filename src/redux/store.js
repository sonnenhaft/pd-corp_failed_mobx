import {
  combineReducers,
  compose,
  createStore
} from 'redux'

import {
  autoRehydrate,
  persistStore
} from 'redux-persist'

import * as reducers from './reducers'

const store = createStore(
  combineReducers(reducers),
  compose(
    autoRehydrate()
  )
)

persistStore(store)

export default store
