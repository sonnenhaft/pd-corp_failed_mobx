/**
 * Here is a index.js file - starting point of react app. You can find it in react build config.
 * Please try not to add many lines in here, most of customizations should be done inside app.js
 * This index file is necessary to configure app for working with:
 * 1. web
 * 2. hot reload
 * 3. with IE), because it will be loaded first, we are loading in here some polyfills for es6.
 */
import 'babel-polyfill'

import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'
import { Provider } from 'mobx-react'

import { assets, routing, user, notifications } from 'mobx-stores'

const render = Component => ReactDom.render(
  <AppContainer>
    <Provider { ...{ routing, assets, user, notifications } }>
      <Component />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)

render(App)

if ( module.hot ) {
  module.hot.accept('./App', () => render(App))
}
