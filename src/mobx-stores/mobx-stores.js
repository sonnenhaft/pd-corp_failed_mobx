import { observe } from 'mobx'
import { create as hydrate } from 'mobx-persist'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import createHashHistory from 'history/createHashHistory'

import { axios } from 'common'
import UserStore from './User.store'
import AssetsStore from './Assets.store'
import NotificationsStore from './Notifications.store'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'

export const notifications = new NotificationsStore()
export const user = new UserStore()
export const assets = new AssetsStore(notifications)
export const routing = new RouterStore()
export const history = syncHistoryWithStore(createHashHistory(), routing)

const loadAssetsFirstTimeOnceAndIgnoreOtherCalls = () => {
  const isAssetsPage = history.location.pathname === '/assets'
  if ( isAssetsPage && user.loggedIn && !assets.initiallyLoaded && assets.hydrated ) {
    // one more hook, also to load assets once
    // may be later would be good to change it to
    // something more clear
    assets.initiallyLoaded = true
    console.log('loading list of assets automatically')
    assets.loadList()
  }
}

const userObservables = {
  stub: () => {
    assets.stub = user.stub
    if ( user.stub ) {
      user.stubLogin()
    }
  },
  token: () => {
    axios.setHeaders({ authorization: user.token })
    user.loggedIn = !!user.token
  },
  loggedIn: loadAssetsFirstTimeOnceAndIgnoreOtherCalls
}

Promise.all([
  hydrate()('userStore', user).then(() => {
    // when you update something in our stores, and know that this value conflicts with
    // existing logic, then you need to commit new value (increment it) of STORES_VERSION,
    // so in customers browser we will clear localStorage and will update the browser
    const STORES_VERSION = '8'

    const localStorageValue = localStorage.getItem('STORES_VERSION')
    if ( localStorageValue && localStorageValue !== STORES_VERSION ) {
      localStorage.clear()
      localStorage.setItem('STORES_VERSION', STORES_VERSION)
      location.reload()
    } else if ( !localStorageValue ) {
      localStorage.setItem('STORES_VERSION', STORES_VERSION)
    }
  }),
  hydrate()('assetsStore', assets).then(() => {
    // we need this hook with hydrated flag, not to load list of assets in
    // incorrect moment, when app starts, for some reason hydrate is
    // asynchronous action, and history subscribe is called right after app starts
    // so we don't need race and we'd like to init app with proper values
    assets.hydrated = true
    loadAssetsFirstTimeOnceAndIgnoreOtherCalls()
  })
])

observe(routing, loadAssetsFirstTimeOnceAndIgnoreOtherCalls)

Object.keys(userObservables).forEach(key => {
  // applying observe to keys of "user" MobX store in iterative style
  observe(user, key, userObservables[key])
})

// called on all location (router) changes
history.subscribe(location => {
  // if we are on edit or view page, we need to select "current" asset
  // location will help us to get this information, edit path will be /asset/edit/asset_id
  // view path will look like /assets/view/asset_id
  const matches = /\/assets\/(edit|view)\/(.*)/.exec(location.pathname)
  if ( matches ) {
    if ( matches[2] !== assets.activeAssetId ) {
      assets.activate(matches[2])
    }
  } else {
    assets.activate(-1)
  }
})

/**
 * Helper function that combines MobX "inject" and MobX "observer"
 * It forwards arguments to "observer".
 */
export const mobxConnect = (...args) => compose(
  inject(...args),
  observer
)
