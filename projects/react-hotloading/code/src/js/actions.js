// Action structure is compliant with FSA (https://github.com/acdlite/flux-standard-action) or
// it's a function to support redux-thunk

export const selectTool = tool => ({ type: 'SELECT_TOOL', payload: { tool } })
export const addTimer = timer => ({type: 'ADD_TIMER', payload: { timer } })
export const increaseTimer = (index, interval) => ({type: 'INCREASE_TIMER', payload: { index, interval } })