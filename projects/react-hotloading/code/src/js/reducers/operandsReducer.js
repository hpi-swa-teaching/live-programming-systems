function operands(state=[], action){
  switch(action.type){
    case "ADD_OPERAND":
      if(action.payload.operand){
        return [...state, action.payload.operand]
      }else{
        return [...state]
      }
    case "CLEAR":
      return []
    default: 
      return [...state]
  }
}

export default operands