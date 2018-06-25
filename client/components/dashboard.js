import React, {Component} from 'react'
import { allModules } from '../allModules'
import Navbar from './navbar'

class Dashboard extends Component {
  render () {
    return (
      <div>
        <Navbar />
        {/*THIS IS THE SIDEBAR*/}
        <div>
        {
          Object.keys(allModules).map(name => {
            return <SideBarModule key={name} icon={""} description={""} name={name} />
           })
        }
        </div>
        <div>
        {
          Object.keys(allModules).map(name => {
            return <DashModule key={name} icon={""} description={""} name={name} modules={allModules[name].dashboardComponent} />
           })
        }
        </div>
      </div>
    )
  }
}

export default Dashboard

