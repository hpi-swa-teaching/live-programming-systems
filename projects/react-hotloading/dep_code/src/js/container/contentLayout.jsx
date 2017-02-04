import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { evaluate } from './../actions'

import Display from './display'
import Keypad from './keypad'
import Operator from './operator'
import BottomRow from './bottomRow'

const ContentLayout = React.createClass({
  propTypes: {
    timer: PropTypes.array,
  },

  componentWillMount() {
  },


  render() {
    return (
      <div className="content">
        <Display></Display>
        <div className="operands">
          <Keypad></Keypad>
          <Operator></Operator>
        </div>
      </div>
    )
  },
})

const mapStateToProps = (state, _ownProps) => ({
  timer: state.timer
})

const mapDispatchToProps = (dispatch, _ownProps) => ({
  evaluteEquation: () => {
    dispatch(evaluate())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentLayout)

