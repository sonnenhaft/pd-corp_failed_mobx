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

hydrate()('userStore', user).then(() => {
  const STORES_VERSION = '8'
  if ( localStorage.getItem('STORES_VERSION') !== STORES_VERSION ) {
    localStorage.clear()
    localStorage.setItem('STORES_VERSION', STORES_VERSION)
    location.reload()
  }
})
hydrate()('assetsStore', assets)

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
  loggedIn: () => {
    const isAssetsPage = ['', '/assets', '/', '/#/'].includes(history.location.pathname)
    if ( user.loggedIn && isAssetsPage && !assets.initiallyLoaded ) {
      assets.initiallyLoaded = true
      console.log('loading list automatically')
      assets.loadList()
    }
  }
}

Object.keys(userObservables).forEach(key => {
  observe(user, key, userObservables[key])
})

history.subscribe(location => {
  const matches = /\/assets\/(edit|view)\/(.*)/.exec(location.pathname)
  if ( matches ) {
    if ( matches[2] !== assets.activeId ) {
      assets.activate(matches[2])
    }
  } else {
    assets.activate(-1)
  }
})

export const mobxConnect = (...args) => compose(
  inject(...args),
  observer
)
