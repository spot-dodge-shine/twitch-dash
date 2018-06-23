'use strict'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import SpotifyVoteline from './spotify-voteline'

const fakeVotecycle = {
  id: 1,
  active: true,
  votechoices: [{
      id: 1,
      track: {
        name: "To My Soul",
        artist: "Jerry Folk",
        album: "To My Soul",
        image: "https://i.scdn.co/image/b23eafdbe6d6b8cbce146f61e11e2e450097d7df",
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
        album: "Body Diamond",
        image: "https://i.scdn.co/image/95250289af2e0848e8392226937b234936d17cff",
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
        album: "GENERATIONWHY",
        image: "https://i.scdn.co/image/01e08194d9fd549f920f23ff98f0bfd492c8c7d9",
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
        album: "Eagle Eyes (Lucas & Steve Remix)",
        image: "https://i.scdn.co/image/ebd3adec32a0e6d97523709947e817228cdca60c",
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
    const totalVotes = fakeVotecycle.votechoices.reduce((total, voteChoice) => {
      return total + voteChoice.votecount
    }, 0)

    return (
      <div
        style={{ width: '750px' }}
      >
        {fakeVotecycle.id ?
          fakeVotecycle.votechoices.map(votechoice => {
            return (
              <SpotifyVoteline
                key={votechoice.id}
                votechoice={votechoice}
                totalVotes={totalVotes}
              />)
          }) :
          <Segment
            attached
          >
            Select a Spotify playlist to start a music poll!
          </Segment>
        }
      </div>
    )
  }
}

export default SpotifyVotecycle
