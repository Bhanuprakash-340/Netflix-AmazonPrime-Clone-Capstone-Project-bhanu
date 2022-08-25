import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Failure from '../Failure'
// import MoviesSlider from '../MoviesSlider'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Originals extends Component {
  state = {
    originalList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getOriginalMovieDetails()
  }

  getOriginalMovieDetails = async () => {
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

  renderOriginalSuccessView = () => {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
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
              /* <MoviesSlider key={eachMovie.id} movieDetails={eachMovie} /> */
              <div className="slick-item" key={eachMovie.id}>
                <Link to={`/movies/${eachMovie.id}`}>
                  <img
                    src={eachMovie.posterPath}
                    alt={eachMovie.title}
                    className="logo-image"
                  />
                </Link>
              </div>
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

  onRetry = () => {
    this.getOriginalMovieDetails()
  }

  renderOriginalFailureView = () => <Failure onRetry={this.onRetry} />

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
    return <> {this.getOriginalListClone()}</>
  }
}

export default Originals
