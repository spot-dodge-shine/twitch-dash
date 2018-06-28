'use strict'

import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import SpotifyVotecycle from './spotify-votecycle'
import store from '../store'

describe('SpotifyVotecycle', () => {
  let spotifyVotecycle

  beforeEach(() => {
    const fakeVotecycle = {
      votechoices: [{
        votecycleEnumId: 1,
        track: {
          name: "Should’ve Been Us - Lost Kings Remix",
          artist: 'Tori Kelly',
          image: 'https://i.scdn.co/image/bf798b42def47dd792b9e51f24fcd42110bbb72a',
        },
        votes: 1
      }]
    }

    spotifyVotecycle = shallow(
      <SpotifyVotecycle
        store={store}
        votecycle={fakeVotecycle}
      />
    )
  })

  it('renders a Segment', () => {
    expect(spotifyVotecycle.find('Segment').length).to.be.equal(1)
  })
})
