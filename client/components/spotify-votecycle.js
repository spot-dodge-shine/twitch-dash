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
        name: "To My Soul",
        artist: "Jerry Folk",
        id: "76xNAVwiQccBXImICK5zUP",
        uri: "spotify:track:76xNAVwiQccBXImICK5zUP"
      },
      votecount: 5,
      votecycleEnumId: 1
    }, {
      id: 2,
      track: {
        name: "By My Side",
        artist: "Great Good Fine Ok",
        id: "51Vf6hJbVnvsTjsvOHoZ3A",
        uri: "spotify:track:51Vf6hJbVnvsTjsvOHoZ3A"
      },
      votecount: 10,
      votecycleEnumId: 2
    }, {
      id: 3,
      track: {
        name: "Generationwhy",
        artist: "ZHU",
        id: "31ZdIGyNncuufUjNTp5ZY3",
        uri: "spotify:track:31ZdIGyNncuufUjNTp5ZY3"
      },
      votecount: 7,
      votecycleEnumId: 3
    }, {
      id: 4,
      track: {
        name: "Eagle Eyes - Lucas & Steve Remix Edit",
        artist: "Felix Jaehn",
        id: "5pvJqNwUUahJIZ9a8CFeiP",
        uri: "spotify:track:5pvJqNwUUahJIZ9a8CFeiP"
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

export default SpotifyVotecycle
