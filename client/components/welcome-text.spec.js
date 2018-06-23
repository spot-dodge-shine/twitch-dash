import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import WelcomeText from './welcome-text'
import store from '../store'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('WelcomeText', () => {
  let welcomeText

  beforeEach(() => {
    welcomeText = shallow(<WelcomeText store={store} />)
  })

  it('renders a Welcome message', () => {
    expect(welcomeText.find('Message').exists()).to.equal(false)
  })
})
