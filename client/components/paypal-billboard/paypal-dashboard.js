import React from 'react'
import {connect} from 'react-redux'
import PayPalLogin from './paypal-login'
import PayPalModule from './paypal-module'

const PayPalDashboard = (props) => {
  return (
    <div>
     {/* {
       props.spotifyId
       ? <SpotifyModule />
       : <SpotifyLogin />
     } */}
     <PayPalLogin />
    </div>
  )
 }

//  const mapState = state => {
//   return {
//     paypalId: state.user.paypalId
//   }
// }

export default PayPalDashboard
// export default connect(mapState)(PayPalDashboard)
