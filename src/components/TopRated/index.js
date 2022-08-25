import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
// import {GoAlert} from 'react-icons/go'
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

class TopRated extends Component {
  state = {
    topRatedList: [],
    topRatedStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    // this.getTrendMoviesDetails()
    this.getTopRatedMovies()
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

  renderTopRatedSuccessView = () => {
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

    const {topRatedList} = this.state

    return (
      <>
        <div className="slick-container">
          <Slider {...settings}>
            {topRatedList.map(eachMovie => (
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

  onRetry = () => {
    this.getTopRatedMovies()
  }

  renderTopRatedFailureView = () => <Failure onRetry={this.onRetry} />

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

  render() {
    return <> {this.getTopRatedListClone()}</>
  }
}

export default TopRated
