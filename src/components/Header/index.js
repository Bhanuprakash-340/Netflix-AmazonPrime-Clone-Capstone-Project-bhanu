import {Component} from 'react'
import './index.css'
import {HiOutlineSearch} from 'react-icons/hi'
import {CgPlayList} from 'react-icons/cg'
import {MdCancel} from 'react-icons/md'
import {Link, withRouter} from 'react-router-dom'

class Header extends Component {
  state = {showHamburger: false}

  onClickButton = () =>
    this.setState(prevState => ({showHamburger: !prevState.showHamburger}))

  render() {
    const {showHamburger} = this.state

    return (
      <>
        <nav className="header-extra">
          <div className="homo-logo-container">
            <div className="logo-search-container">
              <div className="extra">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/bhanu-prakash/image/upload/v1659939641/Group_7399_eg0ly7.png"
                    alt="website logo"
                    className="header-website-logo"
                  />
                </Link>

                <ul className="header-links">
                  <li className="header-text">
                    <Link to="/" className="home-header-text">
                      Home
                    </Link>
                  </li>
                  <li className="header-text">
                    <Link to="/popular" className="home-header-text">
                      Popular
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="header-buttons-container">
                <Link to="/search" className="search-icon-need">
                  <button
                    type="button"
                    className="home-page-search-button"
                    testId="searchButton"
                  >
                    <HiOutlineSearch className="icon" />
                  </button>
                </Link>

                <button
                  type="button"
                  className="hamburger-icon"
                  onClick={this.onClickButton}
                >
                  <CgPlayList className="ham-icon" />
                </button>

                <Link to="/account">
                  <img
                    // src="https://res.cloudinary.com/bhanu-prakash/image/upload/v1659938688/Avatar_pwt7qg.png"
                    src="https://res.cloudinary.com/bhanu-prakash/image/upload/v1659937713/bhanu_pass_port_utina8.jpg"
                    alt="profile"
                    className="user-profile"
                  />
                </Link>
              </div>
            </div>
            {showHamburger && (
              <div className="hamburger-content-display">
                <ul className="small-header-link-components">
                  <li>
                    <Link to="/" className="home-header-text">
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link to="/popular" className="home-header-text">
                      Popular
                    </Link>
                  </li>

                  <li>
                    <Link to="/account" className="home-header-text">
                      Account
                    </Link>
                  </li>
                </ul>
                <div className="cancel-icon">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={this.onClickButton}
                  >
                    <MdCancel size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </>
    )
  }
}

export default withRouter(Header)
