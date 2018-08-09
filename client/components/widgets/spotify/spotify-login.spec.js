import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SpotifyLogin from './spotify-login'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SpotifyLogin', () => {
  let spotifyLogin

  beforeEach(() => {
    spotifyLogin = shallow(<SpotifyLogin />)
  })

  it('renders a single menu', () => {
    expect(spotifyLogin.find('Card').length).to.equal(1)
  })
})
