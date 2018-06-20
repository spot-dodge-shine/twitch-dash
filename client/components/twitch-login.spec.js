import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {TwitchLogin} from './twitch-login'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('TwitchLogin', () => {
  let twitchLogin

  beforeEach(() => {
    twitchLogin = shallow(<TwitchLogin />)
  })

  it('renders the email in an h3', () => {
    expect(twitchLogin.find('button').text()).to.be.equal('Login with twitch')
  })
})
