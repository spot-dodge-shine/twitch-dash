import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SpotifyDashboard from './spotify-dashboard'
import store from '../store'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SpotifyDashboard', () => {
  let spotifyDashboard

  beforeEach(() => {
    spotifyDashboard = shallow(
      <SpotifyDashboard store={store} />)
  })

  xit('renders a div with components in it', () => {
    expect(spotifyDashboard.find('div').length).to.equal(1)
  })
})
