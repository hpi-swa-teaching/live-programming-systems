import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {appendInput} from '../actions'

const BottomRow = React.createClass({
  propTypes: {
    // increaseCount: PropTypes.func.isRequired,
  },

  componentDidMount() {
  },

  render() {
    let onClick = (item) => {
      this.props.addInput(item)
    }
    return (
      <div className="lastRow">
        <div className="buttonLast" onClick={() => onClick(7)}><div className="content">=</div></div>
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomRow)

