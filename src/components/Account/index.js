import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'

class Account extends Component {
  render() {
    const onClickLogout = () => {
      const {history} = this.props
      Cookies.remove('jwt_token')
      history.replace('/login')
    }

    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    const securePassword = '*'.repeat(password.length)

    return (
      <>
        <div className="app-home-container">
          <Header />
          <div className="account-container">
            <div className="account-content-view">
              <h1 className="account-heading">Account</h1>
              <hr className="hr-line" />
              <div className="password-username">
                <p className="side-heading">Member ship</p>
                <div>
                  <p>{username}@gmail.com</p>
                  <p>Password:{securePassword}</p>
                </div>
              </div>
              <hr className="hr-line" />
              <div className="premium">
                <p className="side-heading">Plan details </p>
                <div className="premium-hd">
                  <p>Premium</p>
                  <p className="ultra">Ultra HD</p>
                </div>
              </div>
              <hr className="hr-line" />
              <div className="logout-button-container">
                <button
                  type="button"
                  className="logout-button"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default withRouter(Account)
