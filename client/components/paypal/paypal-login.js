'use strict'

import React from 'react'
import {Button, Icon, Image, Menu} from 'semantic-ui-react'
import styled from 'styled-components'

const PayPalLogo = styled.div`
  justify-content: center;
  max-width: 100px;
  margin-top: 20%;
  margin-left: 20%;
  margin-bottom: 20%;
`

const PayPalButton = styled.div`
  margin-top: 21%;
  margin-right: 20%;
  margin-left: 10%;
`

const PayPalLogin = () => {
  return (
    <div>
      <Menu>
        {/* PayPal image */}
        <Menu.Menu>
        <PayPalLogo>
          <Image src='/images/paypal.png' />
        </PayPalLogo>
      </Menu.Menu>

      {/* Login to PayPal button */}
      <Menu.Menu position='right'>
        <PayPalButton>
        <a href="/auth/paypal">
          <Button primary animated floated='right'>
            <Button.Content visible>
              Connect to PayPal
            </Button.Content>
            <Button.Content hidden>
              <Icon name='paypal' />
            </Button.Content>
          </Button>
          </a>
        </PayPalButton>
      </Menu.Menu>
    </Menu>
   </div>
  )
}

export default PayPalLogin
