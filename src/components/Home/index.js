import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
// import {GoAlert} from 'react-icons/go'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

import Header from '../Header'
import Footer from '../Footer'
import Trending from '../Trending'
import TopRated from '../TopRated'
import Originals from '../Originals'
import Failure from '../Failure'

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
    const randomNum = Math.floor(Math.random() * 10)
    // console.log(randomNum)
    const randomDisplayBg = originalListTheme[randomNum]
    const {overview, title, id, backDropPath} = randomDisplayBg
    // console.log(title)

    return (
      <div
        className="home-bg-container"
        style={{
          backgroundImage: `url(${backDropPath})`,
        }}
      >
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

  renderFailureView = () => <Failure onRetry={this.onRetry} />

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
        <div className="app-home-container">
          <Header />
          <div className="over-ride">
            {this.getOriginalHomeBgTop()}
            <div className="problem">
              <h1 className="trend-text">Trending Now</h1>
              <div className="main-container">
                {/* <h1 className="trend-text">Trending Now</h1> */}
                <Trending />
              </div>
              <h1 className="trend-text">Popular</h1>
              <div className="main-container">
                {/* <h1 className="trend-text">Popular</h1> */}
                <TopRated />
              </div>
              <h1 className="trend-text">Originals</h1>
              <div className="main-container">
                <Originals />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
