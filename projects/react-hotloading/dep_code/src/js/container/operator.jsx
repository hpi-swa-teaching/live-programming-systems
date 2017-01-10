import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { addOperand, clearInput, evaluate } from '../actions'

const Operator = React.createClass({
  propTypes: {
    increaseCount: PropTypes.func.isRequired,
  },

  componentDidMount() {
  },

  render() {
    let onClick = (item) => {
      let operands = [...this.props.operands, this.props.input, item]
      if(this.props.input == 0){
        console.log(this.props.operands)
        operands = [...this.props.operands]
      }else{
        this.props.addOp(this.props.input)
      }
      this.props.addOp(item)
      this.props.solve(operands)
      this.props.clearInput()
    }
    return (
      <div className="operators">
        <div className="button" onClick={() => onClick('+')}><div className="content">+</div></div>
        <div className="button" onClick={() => onClick('-')}><div className="content">-</div></div>
        <div className="button" onClick={() => onClick('÷')}><div className="content">​‌÷</div></div>
        <div className="button" onClick={() => onClick('×')}><div className="content">×</div></div>
      </div>
    )
  },
})

const mapStateToProps = (state, ownProps) => ({
  operands: state.operands,
  input: state.input
})

const mapDispatchToProps = (dispatch, _ownProps) => ({
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
)(Operator)

