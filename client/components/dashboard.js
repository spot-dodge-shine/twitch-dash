import React, {Component} from 'react'
import { connect } from 'react-redux'
import { allModules } from '../allModules'
import Navbar from './navbar'
import SidebarItem from './sidebar-item'
import DashModule from './dash-module'
import {getModulesServer, toggleModuleServer} from '../store'


class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.props.getModules()
    // FOR TESTING PURPOSES
      .then(() => {
        this.props.toggleModule(1)
      })
  }

  render () {
    return (
      <div>
        <Navbar />
        {/*THIS IS THE SIDEBAR*/}
        <div>
        {
          Object.keys(allModules).map(id => {
            return <SidebarItem key={id} icon="" description="" name={allModules[id].name} enabled="" />
           })
        }
        </div>
        <div>
        {
          this.props.modules.active.map(id => {
            return <DashModule key={id} module={allModules[id].dashboardComponent} />
          })
        }
        </div>
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

