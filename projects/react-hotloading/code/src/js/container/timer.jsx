import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {increaseTimer} from '../actions'

const Timer = React.createClass({
  propTypes: {
    increaseCount: PropTypes.func.isRequired,
  },

  componentDidMount() {
    setInterval( () => {
      this.props.increaseCount(this.props.index, this.props.interval)
    }, 1000)
  },

  render() {
    return (
      <div className="timer">
        <div className="header">
          Timer {this.props.index}
        </div>
        <div className="body">
          <div><span>Interval:</span> {this.props.interval}</div>
          <div><span>Count:</span> {this.props.count}</div>
        </div>
      </div>
    )
  },
})

const mapStateToProps = (state, ownProps) => ({
  count: state.timer[ownProps.index].count,
  interval: state.settings.add
})

const mapDispatchToProps = (dispatch, _ownProps) => ({
  increaseCount: (index, interval) => {
    dispatch( increaseTimer(index, interval) )
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timer)

