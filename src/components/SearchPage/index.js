import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
// import {AiOutlineSearch} from 'react-icons/ai'
import {HiOutlineSearch} from 'react-icons/hi'
import {CgPlayList} from 'react-icons/cg'
import {MdCancel} from 'react-icons/md'
import {Link} from 'react-router-dom'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class SearchPage extends Component {
  state = {
    showHamburger: false,
    searchInput: '',
    searchList: [],
    searchListStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSearchDetailsList()
  }

  getSearchDetailsList = async () => {
    this.setState({searchListStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const searchUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(searchUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        backDropPath: each.backdrop_path,
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        searchList: updatedData,
        searchListStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({searchListStatus: apiStatusConstants.failure})
    }
  }

  onClickSearchView = () => this.getSearchDetailsList

  onClickSearchButton = () => {
    const {searchInput} = this.state
    this.onChangeSearchInput(searchInput)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickButton = () =>
    this.setState(prevState => ({showHamburger: !prevState.showHamburger}))

  renderSearchSuccessView = () => {
    const {searchList, searchInput} = this.state

    const searchResult = searchList.filter(each =>
      each.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    // console.log(searchResult.length)
    return (
      <>
        {searchResult.length === 0 ? (
          <div className="no-search-results-container">
            <img
              src="https://res.cloudinary.com/bhanu-prakash/image/upload/v1660319728/Group_1_vktg8w.png"
              alt="no movies"
              className="no-search-result"
            />
            <p className="no-result-text">
              Your search for <span className="search-text">{searchInput}</span>{' '}
              did not find any matches.
            </p>
          </div>
        ) : (
          <div className="popular-movies-container">
            <ul className="popular-list-items-container">
              {searchResult.map(each => (
                <li key={each.id} className="popular-movie">
                  <Link to={`/movies/${each.id}`}>
                    <img
                      src={each.posterPath}
                      alt={each.title}
                      className="popular-images"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    )
  }

  renderSearchFailureView = () => (
    <div className="popular-failure-view">
      <img
        src="https://res.cloudinary.com/bhanu-prakash/image/upload/v1660204770/Background-Complete_ni3wis.png"
        alt="Failure"
        className="popular-failure-image"
      />
      <p className="popular-failure-text">
        Something went wrong, Please try again.
      </p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.onClickSearchView}
      >
        Try Again
      </button>
    </div>
  )

  renderSearchLoadingView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={32} width={32} />
    </div>
  )

  renderSearchView = () => {
    const {searchListStatus} = this.state
    switch (searchListStatus) {
      case apiStatusConstants.success:
        return this.renderSearchSuccessView()
      case apiStatusConstants.failure:
        return this.renderSearchFailureView()
      case apiStatusConstants.inProgress:
        return this.renderSearchLoadingView()
      default:
        return null
    }
  }

  render() {
    const {showHamburger} = this.state
    return (
      <>
        <div className="app-home-container">
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
                  <div className="search-bar-button-container">
                    <input
                      type="search"
                      className="search-bar"
                      placeholder="Search"
                      onChange={this.onChangeSearchInput}
                    />
                    <button
                      type="button"
                      testid="searchButton"
                      className="search-button"
                      onClick={this.onClickSearchButton}
                    >
                      <HiOutlineSearch />
                    </button>
                  </div>

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
          <div className="popular-view">{this.renderSearchView()}</div>
        </div>
      </>
    )
  }
}

export default SearchPage
