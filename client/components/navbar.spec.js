import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Navbar from './navbar'
import store from '../store'

const adapter = new Adapter()
enzyme.configure({adapter})

