import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import Timer from './timer'

const ContentLayout = React.createClass({
  propTypes: {
    timer: PropTypes.array,
  },

  componentWillMount() {
  },

  render() {
    return (
      <div className="content">
        {this.props.timer.map( (timer, index) => (
          <Timer 
            key={index}
            index={index}/>
        ))}
      </div>
    )
  },
})

const mapStateToProps = (state, _ownProps) => ({
  timer: state.timer
})

const mapDispatchToProps = (dispatch, _ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentLayout)

