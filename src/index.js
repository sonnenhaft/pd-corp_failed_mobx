import 'babel-polyfill'

import React from 'react'
import ReactDom from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import { MuiThemeProvider } from 'material-ui/styles'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

const muiTheme = getMuiTheme({
  fontFamily: '"HelveticaNeue", sans-serif ',
  palette: {
    textColor: '#4a4a4a',
    primary1Color: '#0077c8'
  },
  table: {
    backgroundColor: '#faf9f9'
  },
  tableRow: {
    stripeColor:  '#ffffff',
    hoverColor: '#c6ddf2',
    selectedColor: '#c6ddf2'
  }
})

const render = Component => ReactDom.render(
  <Provider store={store}>
    <AppContainer>
      <MuiThemeProvider muiTheme={muiTheme}>
        <Component />
      </MuiThemeProvider>
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
