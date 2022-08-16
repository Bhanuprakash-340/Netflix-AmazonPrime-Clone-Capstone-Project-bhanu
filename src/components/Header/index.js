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
                {/* <button type="button" className="header-website-logo-button"> */}
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/bhanu-prakash/image/upload/v1659939641/Group_7399_eg0ly7.png"
                    alt="website logo"
                    className="header-website-logo"
                  />
                </Link>
                {/* </button> */}

                <ul className="header-links">
                  <Link to="/" className="home-header-text">
                    <li>
                      <p className="header-text">Home</p>
                    </li>
                  </Link>
                  <Link to="/popular" className="home-header-text">
                    <li>
                      <p className="header-text">Popular</p>
                    </li>
                  </Link>
                </ul>
              </div>

              <div className="header-buttons-container">
                <Link to="/search" className="search-icon-need">
                  <HiOutlineSearch className="icon" />
                </Link>

                <button
                  type="button"
                  className="hamburger-icon"
                  onClick={this.onClickButton}
                >
                  <CgPlayList className="ham-icon" />
                </button>
                {/* <button type="button" className="profile-button"> */}

                <Link to="/account">
                  <img
                    src="https://res.cloudinary.com/bhanu-prakash/image/upload/v1659938688/Avatar_pwt7qg.png"
                    alt="profile"
                    className="user-profile"
                  />
                </Link>
                {/* </button> */}
              </div>
            </div>
            {showHamburger && (
              <div className="hamburger-content-display">
                <ul className="small-header-link-components">
                  <Link to="/" className="home-header-text">
                    <li>
                      <p>Home</p>
                    </li>
                  </Link>
                  <Link to="/popular" className="home-header-text">
                    <li>
                      <p>Popular</p>
                    </li>
                  </Link>
                  <Link to="/account" className="home-header-text">
                    <li>
                      <p>Account</p>
                    </li>
                  </Link>
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
