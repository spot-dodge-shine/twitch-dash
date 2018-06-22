import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PlaylistDropdown from './playlist-dropdown'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('PlaylistDropdown', () => {
  let playlistDropdown

  beforeEach(() => {
    playlistDropdown = shallow(<PlaylistDropdown />)
  })

  it('renders a single card', () => {
    expect(playlistDropdown.find('Card').length).to.equal(1)
  })
})
