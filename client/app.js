import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Switch, Route} from 'react-router-dom'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
<<<<<<< HEAD
    <div>
      {isLoggedIn && (
        <Switch>
          <Route path="/" component={Navbar} />
        </Switch>
      )}
      <Routes />
    </div>
=======
    <Routes />
>>>>>>> 9f743b603d7e855251ba980ef53f1de35a897bf8
  )
}

// const mapState = state => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
//     // Otherwise, state.user will be an empty object, and state.user.id will be falsey
//     isLoggedIn: !!state.user.id
//   }
// }
export default App
