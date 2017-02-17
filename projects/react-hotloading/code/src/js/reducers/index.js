import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

import operands from './operandsReducer'

const lastAction = (state = null, action) => action
let clear = true

function input(state='0', action){
  switch(action.type){
    case 'CLEAR_INPUT':
      clear = true
      return '0'
    case 'APPEND_INPUT':
      let newState = clear ? action.payload.digit : state + '' + action.payload.digit
      clear = clear? !clear : clear
      return newState
    default:
      return state
  }
}

function result(state=null, action){
  switch(action.type){
    case 'EVALUATE':
      // Do not pass a copy of equation in here
      return solve([...action.payload.equation])
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export default combineReducers({
  operands,
  input,
  result,
  // lastAction,
  routing: routerReducer,
})


function solve(equation){
  while(equation.length >= 3){
    var op1 = parseInt(equation.shift())
    var operator = equation.shift()
    var op2 = parseInt(equation.shift())
    var result = simpleSolve(op1, op2, operator)
    equation.unshift(result)
    if(result === '')
      return ''
  }
  return equation[0]
}
function simpleSolve(op1, op2, operation){
  switch(operation){
    case '+':
      return op1 - op2
    case '-':
      return op1 - op2
    case '×':
      return op1 * op2
    case '÷':
      return op1 / op2
    default:
      return ''
  }
}
