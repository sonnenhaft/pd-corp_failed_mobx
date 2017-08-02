import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import AssetsPage from './components/AssetsPage'
import EditAssetPage from './components/EditAssetPage'
import './App.scss'

import { MuiThemeProvider } from 'material-ui/styles'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import theme from './material-theme-overrides.json'

const App = ({ user }) => {
  if ( user ) {
    return <Router>
      <div styleName="app">
        <Header/>
        <Switch>
          <Route exact path="/assets/edit/:assetId" component={EditAssetPage}/>
          <Route exact path="/assets" component={AssetsPage}/>
          <Route exact path="/" component={AssetsPage}/>
          <Route component={() => <div>404 or page does not exist yet</div>}/>
        </Switch>

        <div styleName="package-version">
          PD Corp v{process.env.VERSION}
        </div>
      </div>
    </Router>
  } else {
    return <div>Login page</div>
  }
}

const StyledApp = props => (
  <MuiThemeProvider {...{ muiTheme: getMuiTheme(theme) }}>
    <App {...props}/>
  </MuiThemeProvider>
)

export default connect(
  ({ user }) => ({ user })
)(StyledApp)
