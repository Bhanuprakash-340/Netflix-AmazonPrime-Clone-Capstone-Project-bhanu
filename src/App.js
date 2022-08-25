import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

import Account from './components/Account'

import ProtectedRoute from './components/ProtectedRoute'

import PopularMovies from './components/PopularMovies'

import MovieItem from './components/MovieItem'

import NotFound from './components/NotFound'

import Search from './components/Search'

import MovieContext from './context/MovieContext'

import './App.css'

class App extends Component {
  state = {username: '', password: ''}

  triggerChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  triggerChangePassword = event => {
    this.setState({password: event.target.value})
  }

  //   logout = props => {
  //     const {history} = props
  //     Cookies.remove('jwt_token')
  //     history.replace('/login')
  //     this.setState({username: '', password: ''})
  //   }

  render() {
    const {username, password} = this.state

    return (
      <MovieContext.Provider
        value={{
          username,
          password,
          triggerChangeUsername: this.triggerChangeUsername,
          triggerChangePassword: this.triggerChangePassword,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/account" component={Account} />
          <ProtectedRoute exact path="/popular" component={PopularMovies} />
          <ProtectedRoute exact path="/search" component={Search} />
          <ProtectedRoute exact path="/movies/:id" component={MovieItem} />
          <Route path="/bad-path" component={NotFound} />
          <Redirect to="bad-path" />
        </Switch>
      </MovieContext.Provider>
    )
  }
}

export default App
