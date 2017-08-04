import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'react-css-themr'

import Header from './components/Header'
import AssetsPage from './components/AssetsPage'
import EditAssetPage from './components/EditAssetPage'
import './App.css'
import { history } from './redux/store'
import { ConnectedRouter as Router } from 'react-router-redux'

const App = ({ user }) => {
  if ( user ) {
    return <Router history={history}>
      <div styleName="app">
        <Header/>
        <Switch>
          <Route exact path="/assets/edit/:assetId" component={EditAssetPage}/>
          <Route exact path="/assets/view/:assetId" component={() => <EditAssetPage/>}/>
          <Route exact path="/assets/create" component={EditAssetPage}/>
          <Route exact path="/assets" component={AssetsPage}/>
          <Redirect from="/" to="/assets"/>
          <Route component={() => <div>404 or page does not exist yet</div>}/>
        </Switch>

        <div styleName="app-version">PD Corp v{process.env.VERSION}</div>
      </div>
    </Router>
  } else {
    return <div>Login page</div>
  }
}

const theme = {
  RTButton: require('./theme/Button.css'),
  RTCheckbox: require('./theme/Checkbox.css'),
  RTInput: require('./theme/Button.css')
}

const StyledApp = props => (
  <ThemeProvider {...{ theme }}>
    <App {...props}/>
  </ThemeProvider>
)

export default connect(
  ({ user }) => ({ user })
)(StyledApp)
