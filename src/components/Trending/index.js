import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
// import MoviesSlider from '../MoviesSlider'
import {Link} from 'react-router-dom'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'
import Failure from '../Failure'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Trending extends Component {
  state = {
    trendingList: [],
    trendStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendMoviesDetails()
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

  renderTrendingSuccessView = () => {
    const settings = {
      dots: false,
      infinite: false,
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
    this.getTrendMoviesDetails()
  }

  renderTrendingFailureView = () => <Failure onRetry={this.onRetry} />

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

  render() {
    return <>{this.getTrendingListClone()}</>
  }
}

export default Trending
