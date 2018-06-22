'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Segment, Image } from 'semantic-ui-react'

const fakeVotecycle = {
  id: 1,
  active: true,
  votechoices: [{
      id: 1,
      track: {

      },
      votecount: 5,
      votecycleEnumId: 1
    }, {
      id: 2,
      track: {

      },
      votecount: 10,
      votecycleEnumId: 2
    }, {
      id: 3,
      track: {

      },
      votecount: 7,
      votecycleEnumId: 3
    }, {
      id: 4,
      track: {

      },
      votecount: 8,
      votecycleEnumId: 4
    }
  ]
}

class SpotifyVotecycle extends Component {
  render () {
    return (
      <Segment>
      </Segment>
    )
  }
}
