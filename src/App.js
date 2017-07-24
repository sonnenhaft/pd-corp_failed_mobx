import React from 'react'
import { connect } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import AssetsPage from './components/AssetsPage'
import './App.scss'

const App = ({ user }) => {
  if ( user ) {
    return <HashRouter>
      <div>
        <Header/>
        <Switch>
          <Route exact path="/assets" component={AssetsPage}/>
          <Route exact path="/" component={AssetsPage}/>
          <Route component={() => <div>404 or page does not exist yet</div>}/>
        </Switch>

        <div styleName="package-version">
          PD Corp v{process.env.VERSION}
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
