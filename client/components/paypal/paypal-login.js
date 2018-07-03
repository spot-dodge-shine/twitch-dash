'use strict'

import React from 'react'
import { Card, Button, Icon, Image, Menu } from 'semantic-ui-react'
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
    <Card style={{
      width: '425px',
      marginTop: '1rem',
      marginBottom: '1rem'
    }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '1.5rem',
          marginBottom: '1.5rem'
        }}
      >
        <Icon
          name='paypal'
          color='blue'
          size='huge'
        />
        <a href="/auth/paypal">
          <Button primary floated='right'>
            <Button.Content>
              Connect to Paypal
            </Button.Content>
          </Button>
        </a>
      </div>
    </Card>
  )
}

export default PayPalLogin
