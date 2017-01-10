import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// import {increaseTimer} from '../actions'

const Display = React.createClass({
  propTypes: {
    // increaseCount: PropTypes.func.isRequired,
  },

  componentDidMount() {
    setInterval( () => {
      this.props.increaseCount(this.props.index, this.props.interval)
    }, 1000)
  },

  render() {
    return (
      <div className="display">
        <span className="equation">{this.props.operands.join(' ')}</span>
        <span className="equation">=  {this.props.result}</span>
        <span className="input">{this.props.input}</span>
      </div>
    )
  },
})

const mapStateToProps = (state, ownProps) => ({
  operands: state.operands,
  input: state.input,
  result: state.result,
})

const mapDispatchToProps = (dispatch, _ownProps) => ({
  increaseCount: (index, interval) => {
    // dispatch( increaseTimer(index, -6*interval) )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Display)

