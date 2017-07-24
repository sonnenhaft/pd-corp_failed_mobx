import React from 'react'
import { connect } from 'react-redux'
import {
HashRouter,
Route,
Switch
} from 'react-router-dom'

import Header from './components/header/Header'
import './App.scss'

const App = ({ user }) => {
  if ( user ) {
    return <HashRouter>
      <div>
        <Header/>
        <Switch>
          <Route path="/route1" render={() => <div>I'm route 1</div>}/>
          <Route path="/route2" render={() => <div>I'm route 2</div>}/>
          <Route path="/route3" render={() => <div>I'm route 3</div>}/>
          <Route path="/" render={() => <div>I'm root</div>}/>
        </Switch>

        <div styleName="package-version">
          PD Corp {process.env.VERSION}
        </div>
      </div>
    </HashRouter>
  } else {
    return <div>Login page</div>
  }
}

export default connect(
  ({ user }) => ({ user })
)(App)
