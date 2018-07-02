'use strict'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Input, Card, Button, Label, Icon} from 'semantic-ui-react'
import styled from 'styled-components'

const YourPlaylistText = styled.div`
  margin-top: 5%;
  margin-bottom: 5%;
  display: flex;
  text-align: center;
`

const ButtonStyle = styled.div`
  margin-bottom: 5%;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`


export default class PayPalModule extends Component {
  render() {
    return (
      <Card style={{ width: '425px' }}>
      <Wrapper>
        <Form>
          <YourPlaylistText>
          <h3>Billboard</h3>
          </YourPlaylistText>
          <Form.Input labelPosition='center' type='text' placeholder='Amount'>
            <Label basic>$</Label>
              <input type='number' />
          </Form.Input>
          {/* <Form.Input loading icon='user' label='Dollar Amount' placeholder='$0' /> */}
          <ButtonStyle>
            <Button>Confirm</Button>
          </ButtonStyle>
        </Form>
        </Wrapper>
        <Card.Content extra>
            <a>
              <Icon name='paypal' />
              Powered By PayPal
            </a>
          </Card.Content>
      </Card>
    )
  }
}


