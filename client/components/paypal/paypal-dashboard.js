'use strict'

import React from 'react'
import {connect} from 'react-redux'
import PayPalModule from './paypal-module'
import PayPalLogin from './paypal-login'

const PayPalDashboard = (props) => {
  console.log(props.paypalId)
 return (
   <div>
    {
      props.paypalAccessToken
      ? <PayPalModule />
      : <PayPalLogin />
    }
   </div>
 )
}

const mapState = state => {
  return {
    paypalAccessToken: state.user.paypalAccessToken
  }
}

export default connect(mapState)(PayPalDashboard)
