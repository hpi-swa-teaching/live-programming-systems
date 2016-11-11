import React from 'react'
import ReactDOM from 'react-dom'
import {
         compose,
         applyMiddleware,
         createStore,
        } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {
  Router,
  Route,
  browserHistory,
} from 'react-router'
import {
  routerMiddleware,
  syncHistoryWithStore,
} from 'react-router-redux'

import App from './container/App.jsx'
import reducers from './reducers.js'

// Required for isomophic-fetch
require('es6-promise').polyfill()
require('font-awesome/css/font-awesome.min.css')


function isProduction() {
  return process.env.NODE_ENV === 'production'
}

function makeStore(initialState, middlewares) {
  let enhancer

  if (!isProduction()) {
    enhancer = compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    )
  } else {
    enhancer = compose(
      applyMiddleware(...middlewares),
    )
  }

  return createStore(reducers, initialState, enhancer)
}

const reduxRouterMiddleware = routerMiddleware(browserHistory)
const store = makeStore({}, [thunk, reduxRouterMiddleware])
const history = syncHistoryWithStore(browserHistory, store)


// ---------------------
// RENDER
// ---------------------
ReactDOM.render(
  <Provider store={store}>
      <App/>
  </Provider>,
  document.getElementById('root')
)
