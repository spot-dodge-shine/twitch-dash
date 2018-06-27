/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getModulesServer, toggleModuleServer} from './module'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators - modules', () => {
  let store
  let mockAxios

  const defaultState = {
    active: [],
    deactivated: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(defaultState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getModulesServer', () => {
    const fakeModules = {
      active: [
        1
      ],
      deactivated: [
        2
      ]
    }
    beforeEach(() => {
      mockAxios.onGet('/api/users/me/modules').replyOnce(200, fakeModules)
    })

    it('eventually dispatches the GET_MODULES action', () => {
      return store.dispatch(getModulesServer())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_MODULES')
          expect(actions[0].modules.active[0]).to.be.equal(1)
        })
    })
  })

  describe('toggleModuleServer', () => {
    const fakeModules = {
      active: [
        1
      ],
      deactivated: [
        2
      ]
    }

    const fakeModules2 = {
      active: [
      ],
      deactivated: [
        1, 2
      ]
    }

    it('toggles active module', () => {
      mockAxios.onGet('/api/users/me/modules').replyOnce(200, fakeModules)
      mockAxios.onPut('/api/users/me/modules').replyOnce(200, fakeModules2)
      return store.dispatch(toggleModuleServer(1))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('TOGGLE_MODULE')
          expect(actions[0].modules.active.length).equal(0)
        })
    })
  })

})
