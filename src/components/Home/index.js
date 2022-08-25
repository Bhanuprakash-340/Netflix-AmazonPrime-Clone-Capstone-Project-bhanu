import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

import Header from '../Header'
import Footer from '../Footer'
import Trending from '../Trending'
import TopRated from '../TopRated'
import Originals from '../Originals'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    originalListTheme: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const originalUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const originalResponse = await fetch(originalUrl, options)
    // console.log(originalResponse)
    if (originalResponse.ok === true) {
      const originalData = await originalResponse.json()
      const updatedData = originalData.results.map(eachTrend => ({
        backDropPath: eachTrend.backdrop_path,
        id: eachTrend.id,
        overview: eachTrend.overview,
        posterPath: eachTrend.poster_path,
        title: eachTrend.title,
      }))
      this.setState({
        originalListTheme: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {originalListTheme} = this.state
    const randomBgImage =
      originalListTheme[Math.floor(Math.random() * originalListTheme.length)]
    // console.log(randomBgImage)

    const {overview, title, id, backDropPath} = randomBgImage
    // console.log(overview)
    // console.log(title)
    // console.log(id)
    // console.log(backDropPath)

    return (
      <div
        className="home-bg-container"
        style={{
          backgroundImage: `url(${backDropPath})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Header />
        <div className="home-bg-linear">
          <div className="home-page-content">
            <h1 className="home-page-heading">{title}</h1>
            <p className="home-page-description">{overview}</p>
            <div>
              <Link to={`/movies/${id}`}>
                <button type="button" className="play-button">
                  Play
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="bg-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={32} width={32} />
    </div>
  )

  onRetry = () => {
    this.getMovieDetails()
  }

  renderFailureView = () => (
    <div className="error-container-bg">
      <img
        src="https://res.cloudinary.com/bhanu-prakash/image/upload/v1661339065/alert-triangle_1_p5grnb.png"
        alt="failure view"
        className="alert-icon-failure-view"
      />
      <p className="error-text-bg">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-button-bg"
        onClick={this.getMovieDetails}
      >
        {' '}
        Try Again
      </button>
    </div>
  )

  getOriginalHomeBgTop = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="app-home-container" testid="home">
          {this.getOriginalHomeBgTop()}
          <div className="problem">
            <h1 className="trend-text">Trending Now</h1>
            <div className="main-container">
              <Trending />
            </div>
            <h1 className="trend-text">Top Rated</h1>
            <div className="main-container">
              <TopRated />
            </div>
            <h1 className="trend-text">Originals</h1>
            <div className="main-container">
              <Originals />
            </div>
          </div>
          <div className="footer-container">
            <Footer />
          </div>
        </div>
      </>
    )
  }
}

export default Home
