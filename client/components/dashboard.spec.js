import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Dashboard from './dashboard'
import store from '../store'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Dashboard', () => {
  let dashboard

  beforeEach(() => {
    dashboard = shallow(
      <Dashboard store={store} />)
  })

  xit('renders a div with components in it', () => {
    expect(dashboard.find('div').exists()).to.equal(true)
  })
})
