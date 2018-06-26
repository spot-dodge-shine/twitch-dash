'use strict'

import React, { Component } from 'react'
import axios from 'axios'
import { Button } from 'semantic-ui-react'

class ModuleRouteTesting extends Component {
  handlePost = () => {
    return axios.post('api/users/me/modules', { moduleId: 1 })
  }
  handlePut = () => {
    return axios.put('api/users/me/modules', { moduleId: 1 })
  }
  render () {
    return (
      <div>
        <Button
          onClick={this.handlePost}
        >
          Test Post
        </Button>
        <Button
          onClick={this.handlePut}
        >
          Test Put
        </Button>
      </div>
    )
  }
}

export default ModuleRouteTesting
