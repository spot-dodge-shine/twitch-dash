/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getActiveVotecycleServer, createVotechoiceServer, createActiveVotecycleServer} from './votecycle'
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
    const fakeVotecycle = {
      userId: 1,
      active: true
    }
    beforeEach(() => {
      mockAxios.onGet('/api/votecycles/active/1').replyOnce(200, fakeVotecycle)
    })

    it('eventually dispatches the GET_ACTIVE_VOTECYCLE action', async () => {      
      return store.dispatch(getActiveVotecycleServer(1))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_ACTIVE_VOTECYCLE')
          expect(actions[0].votecycle).to.be.deep.equal(fakeVotecycle)
        })
    })
  })

  describe('createActiveVotecycleServer', () => {
    const fakeVotecycle = {
      userId: 1,
      active: true
    }
    beforeEach(() => {
      mockAxios.onPost('/api/votecycles').replyOnce(200, fakeVotecycle)
    })

    it('eventually dispatches the CREATE_ACTIVE_VOTECYCLE action', async () => {      
      return store.dispatch(createActiveVotecycleServer(1))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('CREATE_ACTIVE_VOTECYCLE')
          expect(actions[0].votecycle).to.be.deep.equal(fakeVotecycle)
        })
    })
  })

  describe('createVotechoiceServer', () => {
    const fakeVotechoice = {
      votecycleId: 1
    }
    beforeEach(() => {
      mockAxios.onPost('/api/votechoices').replyOnce(200, fakeVotechoice)
    })

    it('eventually dispatches the CREATE_VOTECHOICE action', async () => {      
      return store.dispatch(createVotechoiceServer(1))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('CREATE_VOTECHOICE')
          expect(actions[0].votechoice).to.be.deep.equal(fakeVotechoice)
        })
    })
  })

})
