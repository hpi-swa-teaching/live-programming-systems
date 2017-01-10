import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {appendInput, evaluate, addOperand, clearInput} from '../actions'

const Keypad = React.createClass({
  propTypes: {
    // increaseCount: PropTypes.func.isRequired,
  },

  componentDidMount() {
  },

  render() {
    let onClick = (item) => {
      this.props.addInput(item)
    }
    let endEquation = () => {
      if(this.props.input != '0'){
        this.props.addOp(this.props.input)
        this.props.solve([...this.props.operands, this.props.input])
      }else{
        this.props.solve([...this.props.operands])
      }
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
  },
})

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
    dispatch( evaluate(equation) )
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Keypad)

