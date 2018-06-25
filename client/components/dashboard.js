import React, {Component} from 'react'
import { allModules } from '../allModules'
import Navbar from './navbar'
import SidebarItem from './sidebar-item'
import DashModule from './dash-module'

class Dashboard extends Component {

  render () {
    let filteredNames = Object.keys(allModules).filter(name => {
      return allModules[name].active
    })
    const filteredModules = {}
    filteredNames.forEach(name => {
      filteredModules[name] = allModules[name]
    })
    console.log(filteredModules, allModules)


    return (
      <div>
        <Navbar />
        {/*THIS IS THE SIDEBAR*/}
        <div>
        {
          Object.keys(allModules).map(name => {
            return <SidebarItem key={name} icon={""} description={""} name={name} enabled={""} />
           })
        }
        </div>
        <div>
        {
          Object.keys(filteredModules).map(name => {
            return <DashModule key={name} module={allModules[name].dashboardComponent} />
          })
        }
        </div>
      </div>
    )
  }
}

export default Dashboard

