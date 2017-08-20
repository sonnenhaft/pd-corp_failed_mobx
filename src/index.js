import 'babel-polyfill'

import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'
import { Provider } from 'mobx-react'

import { assets, routing } from 'mobx-stores'

const render = Component => ReactDom.render(
  <AppContainer>
    <Provider { ...{ routing, assets } }>
      <Component />
    </Provider>

  </AppContainer>,
  document.getElementById('root')
)

render(App)

if ( module.hot ) {
  module.hot.accept('./App', () => render(App))
}
