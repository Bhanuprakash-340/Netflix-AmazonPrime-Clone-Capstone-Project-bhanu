import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMesg: '',
    showPassword: false,
    spinner: false,
  }

  onSubmitSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = message => {
    this.setState({errorMesg: message})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    this.setState({spinner: true})
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    // console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({spinner: false})
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({spinner: false})
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {username, password, errorMesg, showPassword, spinner} = this.state
    const passwordShow = showPassword ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-login-container">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/bhanu-prakash/image/upload/v1659939641/Group_7399_eg0ly7.png"
            alt="login website logo"
            className="login-website-logo"
          />
        </div>
        <form className="form" onSubmit={this.submitForm}>
          <div className="form-div">
            <h1 className="login-heading">Login</h1>
            <div className="input-container">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input-text-box"
                placeholder="Username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                type={passwordShow}
                id="password"
                className="input-password-box"
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="check-box-container">
              <input
                type="checkbox"
                id="showPassword"
                className="check-box"
                onChange={this.onChangeCheckbox}
              />
              <label htmlFor="showPassword" className="check-box-label">
                Show Password
              </label>
            </div>
            <p className="error-message">{errorMesg}</p>
            <div className="login-button-container">
              <button type="submit" className="sign-in-button">
                {/* <span>Sign in</span> */}
                Sign in
                {spinner && (
                  <div className="login-loader-container" data-testid="loader">
                    <Loader
                      type="Oval"
                      height={24}
                      width={24}
                      color="#ffffff"
                      wrapperStyle={{}}
                      wrapperClass=""
                      ariaLabel="oval-loading"
                      secondaryColor="#4fa94d"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  </div>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
