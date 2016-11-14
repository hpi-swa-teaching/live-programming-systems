import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import TopBar from './topBar'
import ContentLayout from './ContentLayout'

require('../../styles/main.styl')
require('../../images/favicon.png')

export const UnconnectedApp = React.createClass({
  propTypes: {
    onBoardQuery: PropTypes.func.isRequired,
  },

  componentWillMount() {
  },

  render() {
    return (
      <main className="main">
        <TopBar/>
        <ContentLayout/>
      </main>
    )
  },
})

const mapStateToProps = (state, _ownProps) => ({
})

const mapDispatchToProps = (dispatch, _ownProps) => ({
  onBoardQuery: () => {
  },
})

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedApp)

export default App
