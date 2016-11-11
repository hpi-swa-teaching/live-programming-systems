import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {addTimer} from '../actions'

const TopBar = React.createClass({
  propTypes: {
    addTimer: PropTypes.func.isRequired,
  },

  componentWillMount() {
  },

  render() {
    return (
      <div className="top-bar">
        <a className="top-btn" onClick={ _ => this.props.addTimer()}>
          Add Timer
        </a>
      </div>
    )
  },
})

const mapStateToProps = (state, _ownProps) => ({
})

const mapDispatchToProps = (dispatch, _ownProps) => ({
  addTimer: () => {
    dispatch(addTimer({
      count: 0
    }))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar)

