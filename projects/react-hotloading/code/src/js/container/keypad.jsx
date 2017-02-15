import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {appendInput, evaluate, addOperand, clearInput, clearOperands} from '../actions'

class Keypad extends React.Component {
  // propTypes: {
  //   // increaseCount: PropTypes.func.isRequired,
  // }

  constructor(props) {
    super(props)
    this.start = Date.now()
    console.log("Start Rendering")
    this.state = {val: 3}
  }

  componentDidMount() {
    let time = Date.now() - this.start
    console.log("Finished Rendering after " + time  + " ms")
    window.reactBM.push(time)
    // setInterval( () => {
    //   console.log("Interval set")
    //   this.setState((prevState) => ({
    //     val: prevState.val+1
    //   }))
    // }, 2000)
  }

  render() {
    let onClick = (item) => {
      this.props.addInput(item)
    }
    let endEquation = () => {
      let operands = [...this.props.operands]
      if(this.props.input != '0'){
        this.props.addOp(this.props.input)
        if(['+', '-', '÷', '×'].indexOf(operands[operands.length -1]) > -1){
          operands = [...this.props.operands, this.props.input]
        }else{
          operands = [this.props.input]
        }
      }
      this.props.solve(operands)
      this.props.clearInput()
    }
    return (
      <div className="numbers">
        <div className="button" onClick={() => onClick(7)}><div className="content">7</div></div>
        <div className="button" onClick={() => onClick(8)}><div className="content">8</div></div>
        <div className="button" onClick={() => onClick(9)}><div className="content">9</div></div>
        <div className="button" onClick={() => onClick(4)}><div className="content">4</div></div>
        <div className="button" onClick={() => onClick(5)}><div className="content">5</div></div>
        <div className="button" onClick={() => onClick(6)}><div className="content">6</div></div>
        <div className="button" onClick={() => onClick(1)}><div className="content">1</div></div>
        <div className="button" onClick={() => onClick(2)}><div className="content">2</div></div>
        <div className="button" onClick={() => onClick(3)}><div className="content">3</div></div>
        <div className="button" onClick={() => onClick(0)}><div className="content">0</div></div>
        <div className="button double" onClick={() => endEquation()}><div className="content">=</div></div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  operands: state.operands,
  input: state.input
})

const mapDispatchToProps = (dispatch, _ownProps) => ({
  addInput: (input) => {
    dispatch( appendInput(input) )
  },
  addOp: (op) => {
    dispatch( addOperand(op) )
  },
  clearInput: () => {
    dispatch( clearInput() )
  },
  solve: (equation) => {
    // console.log("Dispatch: ", equation)
    dispatch( evaluate(equation) )
  },
  clearAll: () => {
    dispatch(clearOperands())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Keypad)

