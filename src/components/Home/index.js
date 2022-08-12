import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {GoAlert} from 'react-icons/go'
import MoviesSlider from '../MoviesSlider'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

import {HomeBg} from './styledComponents'

import Header from '../Header'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    originalList: [],
    trendingList: [],
    topRatedList: [],
    apiStatus: apiStatusConstants.initial,
    trendStatus: apiStatusConstants.initial,
    topRatedStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieDetails()
    this.getTrendMoviesDetails()
    this.getTopRatedMovies()
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
        originalList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  getTrendMoviesDetails = async () => {
    this.setState({trendStatus: apiStatusConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const trendingUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const trendingResponse = await fetch(trendingUrl, options)
    // console.log(trendingResponse)
    if (trendingResponse.ok === true) {
      const trendingData = await trendingResponse.json()
      const updatedData = trendingData.results.map(eachTrend => ({
        backDropPath: eachTrend.backdrop_path,
        id: eachTrend.id,
        overview: eachTrend.overview,
        posterPath: eachTrend.poster_path,
        title: eachTrend.title,
      }))
      this.setState({
        trendingList: updatedData,
        trendStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({trendStatus: apiStatusConstants.failure})
    }
  }

  getTopRatedMovies = async () => {
    this.setState({topRatedStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const topRatedUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const topRatedResponse = await fetch(topRatedUrl, options)
    // console.log(trendingResponse)
    if (topRatedResponse.ok === true) {
      const topRatedData = await topRatedResponse.json()
      const updatedData = topRatedData.results.map(eachTrend => ({
        backDropPath: eachTrend.backdrop_path,
        id: eachTrend.id,
        overview: eachTrend.overview,
        posterPath: eachTrend.poster_path,
        title: eachTrend.title,
      }))
      this.setState({
        topRatedList: updatedData,
        topRatedStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({topRatedStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {originalList} = this.state
    const randomNum = Math.floor(Math.random() * 10)
    // console.log(randomNum)
    const randomDisplayBg = originalList[randomNum]
    const {overview, title, id, posterPath, backDropPath} = randomDisplayBg
    // console.log(title)

    return (
      //  <div className="top"></div>
      <HomeBg bgImageSmall={posterPath} bgImageBig={backDropPath}>
        <div className="home-bg-linear">
          {/* <Header /> */}
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
      </HomeBg>
    )
  }

  renderLoadingView = () => (
    <div className="bg-loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={32} width={32} />
    </div>
  )

  renderFailureView = () => (
    <div className="error-container-bg">
      <GoAlert className="triangle-bg" />
      <p className="error-text-bg">Something went wrong. Please try again</p>
      <button type="button" className="try-again-button-bg">
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

  renderTrendingSuccessView = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    }

    const {trendingList} = this.state

    return (
      <>
        <div className="slick-container">
          <Slider {...settings}>
            {trendingList.map(eachMovie => (
              <MoviesSlider key={eachMovie.id} movieDetails={eachMovie} />
            ))}
          </Slider>
        </div>
      </>
    )
  }

  renderTrendingFailureView = () => (
    <div className="error-container">
      <GoAlert className="triangle" />
      <p className="error-text">Something went wrong. Please try again</p>
      <button type="button" className="try-again-button">
        {' '}
        Try Again
      </button>
    </div>
  )

  renderTrendingLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={32} width={32} />
    </div>
  )

  getTrendingListClone = () => {
    const {trendStatus} = this.state

    switch (trendStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingSuccessView()
      case apiStatusConstants.failure:
        return this.renderTrendingFailureView()
      case apiStatusConstants.inProgress:
        return this.renderTrendingLoadingView()
      default:
        return null
    }
  }

  renderTopRatedSuccessView = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    }

    const {topRatedList} = this.state

    return (
      <>
        <div className="slick-container">
          <Slider {...settings}>
            {topRatedList.map(eachMovie => (
              <MoviesSlider key={eachMovie.id} movieDetails={eachMovie} />
            ))}
          </Slider>
        </div>
      </>
    )
  }

  renderTopRatedFailureView = () => (
    <div className="error-container">
      <GoAlert className="triangle" />
      <p className="error-text">Something went wrong. Please try again</p>
      <button type="button" className="try-again-button">
        {' '}
        Try Again
      </button>
    </div>
  )

  renderTopRatedLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={32} width={32} />
    </div>
  )

  getTopRatedListClone = () => {
    const {topRatedStatus} = this.state
    switch (topRatedStatus) {
      case apiStatusConstants.success:
        return this.renderTopRatedSuccessView()
      case apiStatusConstants.failure:
        return this.renderTopRatedFailureView()
      case apiStatusConstants.inProgress:
        return this.renderTopRatedLoadingView()
      default:
        return null
    }
  }

  renderOriginalSuccessView = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    }

    const {originalList} = this.state

    return (
      <>
        <div className="slick-container">
          <Slider {...settings}>
            {originalList.map(eachMovie => (
              <MoviesSlider key={eachMovie.id} movieDetails={eachMovie} />
            ))}
          </Slider>
        </div>
      </>
    )
  }

  renderOriginalLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={32} width={32} />
    </div>
  )

  renderOriginalFailureView = () => (
    <div className="error-container">
      <GoAlert className="triangle" />
      <p className="error-text">Something went wrong. Please try again</p>
      <button type="button" className="try-again-button">
        {' '}
        Try Again
      </button>
    </div>
  )

  getOriginalListClone = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderOriginalSuccessView()
      case apiStatusConstants.failure:
        return this.renderOriginalFailureView()
      case apiStatusConstants.inProgress:
        return this.renderOriginalLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-home-container">
        <Header />
        <div className="over-ride">
          {this.getOriginalHomeBgTop()}
          <div className="problem">
            <div className="main-container">
              <p className="trend-text">Trending Now</p>
              {this.getTrendingListClone()}
            </div>
            <div className="main-container">
              <p className="trend-text">Popular</p>
              {this.getTopRatedListClone()}
            </div>
            <div className="main-container">
              <p className="trend-text">Originals</p>
              {this.getOriginalListClone()}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
