'use strict'

import React, {Component} from 'react'
import { Segment, Image, Progress } from 'semantic-ui-react'
import Vibrant from 'node-vibrant'
import getColors from './util/getColors'



class SpotifyVoteline extends Component {
  constructor(props) {
    super(props)
    this.palette = {}
  }

  componentDidMount = async () => {
    let palette = await Vibrant.from(this.props.votechoice.track.image).getPalette()
    this.palette = palette
  }

  render() {
    const { votechoice, totalVotes } = this.props
    let colorObj
    if (Object.keys(this.palette).length > 0) { colorObj = getColors(this.palette) }
    console.log(colorObj)
    return (
      <div>
      {
        (Object.keys(this.palette).length > 0)
          ? <Segment
              style={{ 
                display: 'flex',
                backgroundColor: '#' + colorObj.bgArr[0].toString(16)+ colorObj.bgArr[1].toString(16)+ colorObj.bgArr[2].toString(16),
                color: '#' + colorObj.textArr[0].toString(16)+ colorObj.textArr[1].toString(16)+ colorObj.textArr[2].toString(16),
              }}
              attached
            >
            <div>
              <h1
                style={{ marginRight: '1rem' }}
              >
                {votechoice.votecycleEnumId}
              </h1>
            </div>
            <div>
              <Image
                src={votechoice.track.image}
                size='mini'
                style={{ marginRight: '1rem' }}
              />
            </div>
                <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{ marginRight: '1rem',
                      textAlign: 'left'
                    }}
                    >
                      <strong>{votechoice.track.name}</strong><br />
                      {votechoice.track.artist} - {votechoice.track.album}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Progress
                        progress='value'
                        value={votechoice.votes}
                        total={totalVotes}
                        color={'#' + colorObj.textArr[0].toString(16)+ colorObj.textArr[1].toString(16)+ colorObj.textArr[2].toString(16)}
                        style={{ width: '16rem', marginBottom: '0' }}
                      />
                    </div>
                  </div>
            </Segment>
          : <div />
      }
      </div>
    )
  }
}

export default SpotifyVoteline
