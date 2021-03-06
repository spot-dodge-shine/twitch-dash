import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Grid, Card } from 'semantic-ui-react'
import { allModules } from '../allModules'
import DashModule from './dash-module'
import {getModulesServer, toggleModuleServer} from '../store'

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.props.getModules()
  }

  render () {
    return (
      <div>
        {
          this.props.modules.active.map(id => {
            return <DashModule key={id} module={allModules[id]} />
          })
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    modules: state.modules
  }
}

const mapDispatch = (dispatch) => {
  return {
    getModules: () => dispatch(getModulesServer()),
    toggleModule: (moduleId) => dispatch(toggleModuleServer(moduleId))
  }
}

export default connect(mapState, mapDispatch)(Dashboard)

