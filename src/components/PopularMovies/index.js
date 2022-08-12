import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Popular extends Component {
  state = {popularList: [], popularApiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.renderPopularDetails()
  }

  renderPopularDetails = async () => {
    this.setState({popularApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const popularData = await response.json()
      //   console.log(popularData)
      const updatedPopularData = popularData.results.map(each => ({
        backDropPath: each.backdrop_path,
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        popularList: updatedPopularData,
        popularApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({popularApiStatus: apiStatusConstants.failure})
    }
  }

  onClickPopularView = () => this.renderPopularDetails

  renderPopularSuccessView = () => {
    const {popularList} = this.state
    return (
      <>
        <div className="popular-movies-container">
          <ul className="popular-list-items-container">
            {popularList.map(each => (
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
        <Footer />
      </>
    )
  }

  renderPopularFailureView = () => (
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
        onClick={this.onClickPopularView}
      >
        Try Again
      </button>
    </div>
  )

  renderPopularLoadingView = () => (
    <div className="popular-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={32} width={32} />
    </div>
  )

  renderPopularDetailsView = () => {
    const {popularApiStatus} = this.state
    switch (popularApiStatus) {
      case apiStatusConstants.success:
        return this.renderPopularSuccessView()
      case apiStatusConstants.failure:
        return this.renderPopularFailureView()
      case apiStatusConstants.inProgress:
        return this.renderPopularLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-home-container">
        <Header />
        <div className="popular-view">{this.renderPopularDetailsView()}</div>
      </div>
    )
  }
}

export default Popular
