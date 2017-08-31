import './App.css'
import React from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'react-css-themr'

import Header from './components/Header'
import AssetsPage from './components/AssetsPage'
import EditAssetPage from './components/EditAssetPage'
import ImportAssetsPage from './components/ImportAssetsPage'
import Notifications from './components/Notifications'
import { history, mobxConnect } from 'mobx-stores'
import { Button } from 'react-toolbox'
import packageJson from '../package.json'

const App = mobxConnect('user')(({ user }) => {
  if ( user.loggedIn ) {
    return <Router history={ history }>
      <div styleName="app">
        <Notifications/>
        <Header/>
        <Switch>
          <Route exact path="/assets/edit/:assetId" component={ EditAssetPage }/>
          <Route exact path="/assets/view/:assetId" component={ () => <EditAssetPage/> }/>
          <Route exact path="/assets/create" component={ EditAssetPage }/>
          <Route exact path="/assets/import" component={ ImportAssetsPage }/>
          <Route exact path="/assets" component={ AssetsPage }/>
          <Redirect from="/" to="/assets"/>
          <Route component={ () => <div>404 or page does not exist yet</div> }/>
        </Switch>
        <div styleName="app-version">PD Corp v{packageJson.version}</div>
      </div>
    </Router>
  } else {
    return <div style={ { padding: '20px' } }>
      <Button primary raised onClick={ () => user.login() }>Login</Button>
      &nbsp;
      <Button primary raised onClick={ () => user.stubLogin() }>Stub</Button>
      <br/>
      <div>{user.error}</div>
    </div>
  }
})

const theme = {
  RTButton: require('./theme/Button.css'),
  RTDialog: require('./theme/Dialog.css'),
  RTCheckbox: require('./theme/Checkbox.css'),
  RTInput: require('./theme/Input.css')
}

// eslint-disable-next-line react/display-name
export default () => (
  <ThemeProvider { ...{ theme } }>
    <App/>
  </ThemeProvider>
)



