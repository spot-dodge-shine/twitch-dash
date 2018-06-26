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
    let colorArr = []
    let luminance = 0

    const convertColor = color => {
      let converted = color.toString(16)
      return converted.length === 1 ? '0' + converted : converted
    }

    if (Object.keys(this.palette).length > 0) {
      colorObj = getColors(this.palette)
    }

    if(colorObj) {
      colorObj.bgArr = colorObj.bgArr.map(colorElem => {
        return Math.round(colorElem)
      })
      colorObj.bgArr.forEach(colorElem => {
        colorElem = colorElem / 255
        if (colorElem <= 0.03928) {
          colorElem = colorElem / (12.92)
          colorArr.push(colorElem)
        } else {
          colorElem = Math.pow(((colorElem + 0.055) / (1.055)), 2.4)
          colorArr.push(colorElem)
        }
      })
      luminance = 0.2126 * colorArr[0] + 0.7152 *  colorArr[1] + 0.0722 *  colorArr[2]
    }

    return (
      <div>
      {
        (Object.keys(this.palette).length > 0)
          ? <Segment
              style={{
                display: 'flex',
                backgroundColor: '#'
                  + convertColor(colorObj.bgArr[0])
                  + convertColor(colorObj.bgArr[1])
                  + convertColor(colorObj.bgArr[2]),
                color: luminance > 0.179 ? '#000000' : '#ffffff'
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
                    inverted
                    color='grey'
                    style={{ width: '14rem', marginBottom: '0' }}
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
