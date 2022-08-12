import {Component} from 'react'
import './index.css'
import {AiOutlineSearch} from 'react-icons/ai'
import {CgPlayList} from 'react-icons/cg'
import {MdCancel} from 'react-icons/md'
import {Link} from 'react-router-dom'

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
                <button type="button" className="header-website-logo-button">
                  <Link to="/">
                    <img
                      src="https://res.cloudinary.com/bhanu-prakash/image/upload/v1659939641/Group_7399_eg0ly7.png"
                      alt="website logo"
                      className="header-website-logo"
                    />
                  </Link>
                </button>

                <div className="header-links">
                  <Link to="/" className="home-header-text">
                    <p className="header-text">Home</p>
                  </Link>
                  <Link to="/popular-movies" className="home-header-text">
                    <p className="header-text">Popular</p>
                  </Link>
                </div>
              </div>

              <div className="header-buttons-container">
                <button type="button" className="search-icon">
                  <Link to="/search">
                    <AiOutlineSearch className="icon" />
                  </Link>
                </button>
                <button
                  type="button"
                  className="hamburger-icon"
                  onClick={this.onClickButton}
                >
                  <CgPlayList className="ham-icon" />
                </button>
                <button type="button" className="profile-button">
                  <Link to="/account">
                    <img
                      src="https://res.cloudinary.com/bhanu-prakash/image/upload/v1659938688/Avatar_pwt7qg.png"
                      alt="profile"
                      className="user-profile"
                    />
                  </Link>
                </button>
              </div>
            </div>
            {showHamburger && (
              <div className="hamburger-content-display">
                <div className="small-header-link-components">
                  <Link to="/" className="home-header-text">
                    <p>Home</p>
                  </Link>
                  <Link to="/popular-movies" className="home-header-text">
                    <p>Popular</p>
                  </Link>

                  <Link to="/account" className="home-header-text">
                    <p>Account</p>
                  </Link>
                </div>
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

export default Header
