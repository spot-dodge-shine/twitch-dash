import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Navbar from './navbar'
import {Menu} from 'semantic-ui-react'
import store from '../../store'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Navbar', () => {
  let navbar

  beforeEach(() => {
    navbar = shallow(
      <Navbar store={store} />)
  })

  xit('renders', () => {
    expect(navbar.find(Menu).exists()).to.equal(true)
  })
})

