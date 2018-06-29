import React, {Component} from 'react'
import { connect } from 'react-redux'
import { allModules } from '../allModules'
import DashModule from './dash-module'
import {getModulesServer, toggleModuleServer} from '../store'
<<<<<<< HEAD
import MyEditor from './paypal-billboard/paypal-module'
import {Grid} from 'semantic-ui-react'

=======
>>>>>>> 5799195826504e2813a13cdd6be147a3e4bac0d3

{/* <Grid columns={1}>
        <Grid.Column>
          <Grid.Row>
          </Grid.Row>
      </Grid.Column>
    </Grid> */}

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
<<<<<<< HEAD
        <Grid columns={1}>
          <Grid.Column>
            <Grid.Row>
              <MyEditor />
          </Grid.Row>
          </Grid.Column>
        </Grid>
=======
>>>>>>> 5799195826504e2813a13cdd6be147a3e4bac0d3
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

