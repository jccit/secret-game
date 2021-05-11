import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Game from './Game'
import { store } from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('app')
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}