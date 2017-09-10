import './App.css'
import React from 'react'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import { ThemeProvider } from 'react-css-themr'

import Header from './components/Header'
import AssetsPage from './components/AssetsPage'
import EditAssetPage from './components/EditAssetPage'
import ImportAssetsPage from './components/ImportAssetsPage'
import Notifications from './components/Notifications'
import { history, mobxConnect } from 'mobx-stores'
import { Button } from 'react-toolbox'
import packageJson from '../package.json'

/**
 * Root "App" component, that should contain most of
 * routing logic (what to display when url changes),
 * initial auth logic, it also contains info about themeing.
 */
const App = mobxConnect('user')(({ user }) => {
  if ( user.loggedIn ) {
    return <Router history={ history }>
      <div styleName="app">
        <Notifications/>
        <Header/>
        {/* Note how switch is used to render particular page basing on current url
         Please also not that order matters in here. */}
        <Switch>
          <Route exact path="/assets/edit/:assetId" component={ EditAssetPage }/>
          {/* We need function wrapper in here because of router not
           triggers render on location param (:assetId) changed. */}
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
    // TODO(vlad): extract to login page
    return <div style={ { padding: '20px' } }>
      <Button primary raised onClick={ () => user.login() }>Login</Button>
      {/* You see &nbsp; in here, and some where else because
       of how react trims lines in JSX. */}
      &nbsp;
      <Button primary raised onClick={ () => user.stubLogin() }>Stub</Button>
      <br/>
      <div>{user.error}</div>
    </div>
  }
})

/**
 * Please not that  in here we use require. This section describes most of
 * css overrides or react-toolbox. Please also note that because of css modules
 * all css class names of react-toolbox are hashed like ".button-[kind-of-mda-hash]" and
 * you can not override them globally, but you can do this via such requiring.
 * PS: React toolbox css VARIABLES overrides lay in /postcss.config.js
 */
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
