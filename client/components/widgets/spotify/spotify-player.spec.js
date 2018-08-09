'use strict'

import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import SpotifyPlayer from './spotify-player'
import store from '../../../store'

describe('SpotifyPlayer', () => {
  let spotifyPlayer

  beforeEach(() => {
    spotifyPlayer = shallow(
      <SpotifyPlayer
        store={store}
      />).dive()
  })

  it('renders a Segment', () => {
    expect(spotifyPlayer.find('Segment').length).to.be.equal(1)
  })
  it('renders a Header', () => {
    expect(spotifyPlayer.find('Header').length).to.be.equal(1)
  })
  it('renders two Buttons', () => {
    expect(spotifyPlayer.find('Button').length).to.be.equal(2)
  })
  it('renders two Icons', () => {
    expect(spotifyPlayer.find('Icon').length).to.be.equal(2)
  })
})
