import { axios } from 'common'

import user from './User.store'
import assets from './Assets.store'
import { create as hydrate } from 'mobx-persist'
import { autorun } from 'mobx'
import routing, { history } from './Routing.store'

export { user, assets, history, routing }

autorun(() => {
  if (user.loggedIn && history.location.pathname === '/assets' && !assets.list.length && !assets.tableLoading) {
    assets.loadList()
  }
})

hydrate()('userStore', user).then(() => {
  if ( user.token ) {
    axios.setHeaders({ authorization: user.token })
    user.loggedIn = true
  }
})

history.subscribe(location => {
  const matches = /\/assets\/(edit|view)\/(.*)/.exec(location.pathname)
  if ( matches && (matches[2] !== assets.activeId) ) {
    assets.activate(matches[2])
  } else if ( !matches ) {
    assets.activate(-1)
  }
})


