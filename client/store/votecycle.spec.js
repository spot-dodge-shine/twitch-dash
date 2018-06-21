/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getActiveVotecycleServer} from './user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators - votecycles', () => {
  let store
  let mockAxios

  const initialState = {
    votechoices: []
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getActiveVotecycleServer', () => {
    it('eventually dispatches the GET_ACTIVE_SERVER action', async () => {
      const fakeVotecycle = {
        userId: 1,
        active: true
      }
      console.log(getActiveVotecycleServer)
      mockAxios.onGet('//api/votecycles/active').replyOnce(200, fakeVotecycle)
      await store.dispatch(getActiveVotecycleServer(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ACTIVE_SERVER')
      expect(actions[0].votecycle).to.be.deep.equal(fakeVotecycle)
    })
  })

})
