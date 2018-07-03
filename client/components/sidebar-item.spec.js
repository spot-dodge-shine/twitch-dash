import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SidebarItem from './sidebar-item'
import store from '../store'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SidebarItem', () => {
  let sidebarItem

  beforeEach(() => {
    sidebarItem = shallow(
      <SidebarItem
        name='Spotify'
        store={store}
      />)
  })

  xit('renders a name', () => {
    expect(sidebarItem.find('div').text()).to.be.equal('Spotify')
  })
})
