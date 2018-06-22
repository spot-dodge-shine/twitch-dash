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

const YourPlaylistText = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
`

const DropDownStyle = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 5%
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

    return (
      <div>
        <Wrapper>
          <Card>
            <Card.Header>
              <YourPlaylistText>
                <h3>Your Spotify Playlists</h3>
              </YourPlaylistText>
              <DropDownStyle>
                <Dropdown button='true' placeholder='Select a Playlist' fluid search selection options={dummySongs} />
              </DropDownStyle>
            </Card.Header>
            <Card.Content extra>
              <a>
                <Icon name='spotify' />
                {dummySongs.length} Playlists
              </a>
            </Card.Content>
          </Card>
        </Wrapper>
      </div>
    )
  }
}


// const mapState = state => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
//     // Otherwise, state.user will be an empty object, and state.user.id will be falsey
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     loadInitialData() {
//       dispatch(me())
//     }
//   }
// }

// // The `withRouter` wrapper makes sure that updates are not blocked
// // when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes))

// /**
//  * PROP TYPES
//  */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }


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

