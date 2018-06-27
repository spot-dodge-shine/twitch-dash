import React, {Component} from 'react'
import { connect } from 'react-redux'
import { allModules } from '../allModules'
import DashModule from './dash-module'
import {getModulesServer, toggleModuleServer} from '../store'


class Dashboard extends Component {

  constructor(props) {
    console.log('CONSTRUCTOR')
    super(props)
    this.props.getModules()
  }

  render () {
    console.log('allModules', this.props.modules)
    return (
      <div>
        {
          this.props.modules.active.map(id => {
            return <DashModule key={id} module={allModules[id].dashboardComponent} />
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

