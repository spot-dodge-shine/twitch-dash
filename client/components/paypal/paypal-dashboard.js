'use strict'

import React from 'react'
import {connect} from 'react-redux'
import PayPalModule from './paypal-module'
import PayPalLogin from './paypal-login'

const PayPalDashboard = (props) => {
 return (
   <div>
    {
      props.paypalId
      ? <PayPalModule />
      : <PayPalLogin />
    }
   </div>
 )
}

const mapState = state => {
  return {
    paypalId: state.user.paypalId
  }
}

export default connect(mapState)(PayPalDashboard)
