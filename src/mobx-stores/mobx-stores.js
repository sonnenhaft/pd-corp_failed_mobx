import { observe } from 'mobx'
import { create as hydrate } from 'mobx-persist'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import createHashHistory from 'history/createHashHistory'

import { axios } from 'common'
import UserStore from './User.store'
import AssetsStore from './Assets.store'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'

export const user = new UserStore()
export const assets = new AssetsStore()
export const routing = new RouterStore()
export const history = syncHistoryWithStore(createHashHistory(), routing)

hydrate()('userStore', user)
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
    const isAssetsPage = history.location.pathname === '/assets'
    if ( user.loggedIn && isAssetsPage && !assets.list.length && !assets.tableLoading ) {
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

