function settings(state = {add: 0.1}, action){
  switch(action.type){
    case 'CHANGE_SETTING':
      return {
        ...state,
        ...action.payload,
        other: 'hallo'
      }
    default:
      return {...state}
  }
}

export default settings

// https://www.youtube.com/watch?v=xsSnOQynTHs
React - todo mvc
Hot Code reloading
Verhalten & Rendering
Iwas wo redux dann auch eingesetzt werden könntea