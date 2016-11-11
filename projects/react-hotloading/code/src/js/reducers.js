import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import timer from './reducers/timerReducer'
import settings from './reducers/settingsReducer'

const lastAction = (state = null, action) => action

export default combineReducers({
  timer,
  settings,
  lastAction,
  routing: routerReducer,
})
