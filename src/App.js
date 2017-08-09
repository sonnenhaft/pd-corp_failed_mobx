import React from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'react-css-themr'

import Header from './components/Header'
import AssetsPage from './components/AssetsPage'
import EditAssetPage from './components/EditAssetPage'
import { history } from 'mobx/Routing.store'
import './App.css'

const App = ({ user = true }) => {
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
  RTInput: require('./theme/Input.css')
}


// eslint-disable-next-line react/display-name
export default  props => (
  <ThemeProvider {...{ theme }}>
    <App {...props}/>
  </ThemeProvider>
)
