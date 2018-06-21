'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, Item, Button, Icon, Grid, Image, Dropdown, Menu} from 'semantic-ui-react'
import styled from 'styled-components'

const Wrapper = styled.div`
display: flex;
justify-content: center;
text-align: center;
align-items: center;
margin-top: 5%;
`

const SpotifyLogo = styled.div`
  justify-content: center;
  max-width: 100px;
  margin-top: 10%;
  margin-left: 10%;
  margin-bottom: 10%;
`

const SpotifyButton = styled.div`
  margin-top: 18%;
  margin-right: 10%;
  margin-left: 10%;
`

export class PlaylistDropdown extends Component {

  // constructor(props) {
  //   super(props)
  //   this.props.getPlaylists()
  //   .then(() => {
  //     return this.props.refreshToken()
  //   })
  //   .then(() => {
  //     return this.props.getPlaylists()
  //   })
  //   .then(() => {
  //     return this.props.selectPlaylist(this.props.playlists[0])
  //   })
  // }
  render () {
    const dummySongs = [
      {text:'My Beautiful Dark Twisted Fantasy'},
      {text:'Kids See Ghosts'},
      {text:'ye'}
    ]

    // const items = [{
    //   childKey: 0,
    //   image: '/images/spotifylogoblue.png',
    //   description: 'log in to spotify!'
    // }]

    return (
      <div>
        <Wrapper>
          <Menu>
            <Menu.Menu>
              <SpotifyLogo>
                <Image src='/images/spotifylogoblue.png' />
              </SpotifyLogo>
            </Menu.Menu>
            <a href="/auth/spotify">
            <Menu.Menu position='right'>
              <SpotifyButton>
                <Button primary animated floated='right'>
                  <Button.Content visible>
                    Connect to Spotify
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name='spotify' />
                  </Button.Content>
                </Button>
              </SpotifyButton>
            </Menu.Menu>
            </a>
          </Menu>
        </Wrapper>
        <h3>Your Spotify Playlists</h3>
        <Dropdown button='true' placeholder='Select a Playlist' fluid search selection options={dummySongs} />
      </div>
    )
  }
}


// const mapState = (state) => {
//   return {
//     isLoggedIn: !!state.user.spotifyEmail,
//     playlists: state.user.playlists,
//     selectedPlaylist: state.user.selectedPlaylist,
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     getPlaylists: () => dispatch(getPlaylists()),
//     refreshToken: () => dispatch(refreshSpotifyToken()),
//     selectPlaylist: (playlist) => dispatch(selectPlaylist(playlist)),
//   }
// }

export default PlaylistDropdown /*connect(mapState, mapDispatch)(PlaylistDropdown)*/



// const TwitchLogin = () => {

//   return (
//     <Wrapper>
//       <Card>
//         <Card.Content>
//           <Card.Header>
//           <Image src='/images/twitchbuddylogo.png' />
//             Welcome to twitch dash
//           </Card.Header>
//           <Card.Description>
//             <a href="/auth/twitch">
//               <Button primary animated>
//               <Button.Content visible>Login with twitch</Button.Content>
//               <Button.Content hidden>
//                 <Icon name='twitch' />
//               </Button.Content>
//               </Button>
//             </a>
//           </Card.Description>
//         </Card.Content>
//       </Card>
//     </Wrapper>
//   )
// }

