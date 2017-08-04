import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { autoRehydrate, persistStore } from 'redux-persist'

import * as reducers from './reducers'
import assets from './asset.reducer'

import createHistory from 'history/createHashHistory'
import { routerMiddleware, routerReducer } from 'react-router-redux'

import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react'

export const history = createHistory()

export const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
  </DockMonitor>
)

export const store = createStore(
  combineReducers({
    ...reducers,
    assets,
    router: routerReducer
  }),
  compose(
    DevTools.instrument(),
    applyMiddleware(routerMiddleware(history)),
    autoRehydrate()
  )
)

persistStore(store)

export default store
