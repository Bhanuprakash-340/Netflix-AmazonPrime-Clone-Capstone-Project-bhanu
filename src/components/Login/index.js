import {Component} from 'react'
// import Loader from 'react-loader-spinner'

import {Redirect} from 'react-router-dom'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import MovieContext from '../../context/MovieContext'

import './index.css'

class Login extends Component {
  state = {
    errorMesg: '',
    showErrorMesg: false,
    // spinner: false,
    // showPassword: false,
  }

  //   onChangeCheckbox = () => {
  //     this.setState(prevState => ({showPassword: !prevState.showPassword}))
  //   }

  render() {
    return (
      <MovieContext.Consumer>
        {value => {
          const {
            username,
            password,
            triggerChangeUsername,
            triggerChangePassword,
          } = value

          const onChangeUsername = event => {
            triggerChangeUsername(event)
          }

          const onChangePassword = event => {
            triggerChangePassword(event)
          }

          const onSubmitSuccess = token => {
            const {history} = this.props
            Cookies.set('jwt_token', token, {expires: 30})
            history.replace('/')
          }

          const onSubmitFailure = message => {
            this.setState({errorMesg: message, showErrorMesg: true})
          }

          const submitForm = async event => {
            event.preventDefault()
            /* this.setState({spinner: true}) */
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
              /* this.setState({spinner: false}) */
              onSubmitSuccess(data.jwt_token)
            } else {
              /* this.setState({spinner: false}) */
              onSubmitFailure(data.error_msg)
            }
          }

          const {errorMesg, showErrorMesg} = this.state

          /* const passwordText = showPassword === true ? 'text' : 'password' */

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
              <form className="form" onSubmit={submitForm}>
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
                      onChange={onChangeUsername}
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="password" className="label">
                      PASSWORD
                    </label>
                    <input
                      type="password"
                      //   type={passwordText}
                      id="password"
                      className="input-password-box"
                      placeholder="Password"
                      value={password}
                      onChange={onChangePassword}
                    />
                  </div>
                  {showErrorMesg && (
                    <p className="error-message">{errorMesg}</p>
                  )}
                  {/* <div className="check-box-container">
                    <input
                      type="checkbox"
                      id="showPassword"
                      className="check-box"
                      onChange={this.onChangeCheckbox}
                    />
                    <label htmlFor="showPassword" className="check-box-label">
                      Show Password
                    </label>
                  </div> */}
                  <div className="login-button-container">
                    <button
                      type="submit"
                      className="sign-in-button"
                      testid="logIn"
                    >
                      Login
                      {/* {spinner && (
                        <div
                          className="login-loader-container"
                          data-testid="loader"
                        >
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
                      )} */}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )
        }}
      </MovieContext.Consumer>
    )
  }
}

export default Login
