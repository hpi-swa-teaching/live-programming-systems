import expect from 'expect'
import { isFSA } from 'flux-standard-action'
import * as actions from '../../../src/js/actions'


describe('actions', () => {
  Object.keys(actions).forEach((key) => {
    const action = actions[key]()
    it(`${key} complies with flux standard action syntax`, () => {
      expect((action instanceof Function) || isFSA(action)).toBe(true)
    })
  })
})
