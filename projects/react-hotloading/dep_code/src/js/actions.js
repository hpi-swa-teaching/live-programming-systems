// Action structure is compliant with FSA (https://github.com/acdlite/flux-standard-action) or
// it's a function to support redux-thunk

export const appendInput = digit => ({ type: 'APPEND_INPUT', payload: { digit } })
export const clearInput = () => ({type: 'CLEAR_INPUT', payload: { } })
export const evaluate = (equation) => ({type: 'EVALUATE', payload: {equation} })

export const addOperand = operand => ({type: 'ADD_OPERAND', payload: {operand}})
export const clearOperands = () => ({type: 'CLEAR', payload: {}})