import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

import Account from './components/Account'

import ProtectedRoute from './components/ProtectedRoute'

import PopularMovies from './components/PopularMovies'

import MovieItem from './components/MovieItem'

import NotFound from './components/NotFound'

import SearchPage from './components/SearchPage'

import './App.css'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/account" component={Account} />
        <ProtectedRoute exact path="/popular" component={PopularMovies} />
        <ProtectedRoute exact path="/search" component={SearchPage} />
        <ProtectedRoute exact path="/movies/:id" component={MovieItem} />
        <Route path="/bad-path" component={NotFound} />
        <Redirect to="bad-path" />
      </Switch>
    )
  }
}

export default App
