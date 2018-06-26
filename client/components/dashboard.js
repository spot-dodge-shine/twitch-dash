import React, {Component} from 'react'
import { allModules } from '../allModules'
import Navbar from './navbar'
import SidebarItem from './sidebar-item'
import DashModule from './dash-module'

class Dashboard extends Component {

  render () {
    // let filteredNames = Object.keys(allModules).filter(name => {
    //   return allModules[name].active
    // })
    // const filteredModules = {}
    // filteredNames.forEach(name => {
    //   filteredModules[name] = allModules[name]
    // })
    // console.log(filteredModules, allModules)
    let filteredModules = allModules

    // TODO: get info from database


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
          Object.keys(filteredModules).map(id => {
            return <DashModule key={id} module={allModules[id].dashboardComponent} />
          })
        }
        </div>
      </div>
    )
  }
}

export default Dashboard

