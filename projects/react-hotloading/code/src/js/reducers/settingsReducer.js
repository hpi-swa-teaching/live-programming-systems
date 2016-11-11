function settings(state = {add: 0.1}, action){
  switch(action.type){
    case 'CHANGE_SETTING':
      return {
        ...state,
        ...action.payload
      }
    default:
      return {...state}
  }
}

export default settings