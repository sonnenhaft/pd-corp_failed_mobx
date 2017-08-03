import 'babel-polyfill'

import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const render = Component => ReactDom.render(
  <Provider store={store}>
    <AppContainer>
      <Component />
    </AppContainer>
  </Provider>,
  document.getElementById('root')
)

render(App)

if ( module.hot ) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
