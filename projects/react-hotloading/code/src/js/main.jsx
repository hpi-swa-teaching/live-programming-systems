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
import DevTools from './container/DevTools.jsx'
import reducers from './reducers/index.js'

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
      // window.devToolsExtension ? window.devToolsExtension() : f => f,
      DevTools.instrument(),
    )
  } else {
    enhancer = compose(
      applyMiddleware(...middlewares),
      persistState(getDebugSessionKey())
    )
  }

  return createStore(reducers, initialState, enhancer)
}
window.reduxBM = []
window.reactBM = []

const reduxRouterMiddleware = routerMiddleware(browserHistory)
const store = makeStore({}, [thunk, reduxRouterMiddleware])
const history = syncHistoryWithStore(browserHistory, store)

if(module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const start = Date.now()
    console.log("----------------------------------------------")
    console.log("Start Reapplying Reducer Changes")
    const nextReducer = require('./reducers/index').default;

    store.replaceReducer(nextReducer);
    const timeInMs = Date.now() - start
    window.reduxBM.push(timeInMs)
    console.log("Needed " + timeInMs + " ms for Redux to emerge")
    console.log("----------------------------------------------")
  });
}


// ---------------------
// RENDER
// ---------------------
ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
)


function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);

  return (matches && matches.length > 0) ? matches[1] : null;
}