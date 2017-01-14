import expect from 'expect'
import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

import App, { UnconnectedApp } from '../../../src/js/components/App.jsx'

describe('components', () => {
  let initialState
  let store
  let component
  let props
  beforeEach(() => {
    initialState = global.createInitialState()
    store = configureMockStore()(initialState)
    props = { params: {} }
    component = mount(<Provider store={store}><App {...props} /></Provider>)
    component = component.find('UnconnectedApp')
  })
  describe('App', () => {
    it('renders correctly', () => {
      expect(component).toExist()
      expect(component.type()).toEqual(UnconnectedApp)
    })
  })
})
