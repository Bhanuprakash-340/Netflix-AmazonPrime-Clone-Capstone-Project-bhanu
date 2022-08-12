import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import {MovieItemBg} from './styledComponents'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class MovieItem extends Component {
  state = {
    movieItemBannerDetails: [],
    genresList: [],
    similarMoviesList: [],
    languages: [],
    movieItemApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieItem()
  }

  getMovieItem = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)

    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    // console.log(response)
    if (response.ok === true) {
      const movieItemData = await response.json()
      const updatedData = movieItemData.movie_details
      const bannerData = {
        adult: updatedData.adult,
        backdropPath: updatedData.backdrop_path,
        budget: updatedData.budget,
        id: updatedData.id,
        overview: updatedData.overview,
        posterPath: updatedData.poster_path,
        releaseDate: updatedData.release_date,
        runtime: updatedData.runtime,
        title: updatedData.title,
        voteAverage: updatedData.vote_average,
        voteCount: updatedData.vote_count,
      }
      const genresListItems = updatedData.genres
      const similarMoviesData = updatedData.similar_movies.map(eachMovie => ({
        backDropPath: eachMovie.backdrop_path,
        similarMoviesId: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      const languagesList = updatedData.spoken_languages.map(each => ({
        language: each.english_name,
        languagesId: each.id,
      }))
      //   console.log(updatedData)
      //   console.log(bannerData)
      //   console.log(genresListItems)
      //   console.log(similarMoviesData)
      //   console.log(languagesList)
      this.setState({
        movieItemBannerDetails: bannerData,
        genresList: genresListItems,
        similarMoviesList: similarMoviesData,
        languages: languagesList,
        movieItemApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({movieItemApiStatus: apiStatusConstants.failure})
    }
  }

  renderMovieItemSuccessView = () => {
    const {
      movieItemBannerDetails,
      genresList,
      languages,
      similarMoviesList,
    } = this.state
    console.log(movieItemBannerDetails)
    const {
      adult,
      backdropPath,
      budget,
      overview,
      posterPath,
      releaseDate,
      runtime,
      title,
      voteAverage,
      voteCount,
    } = movieItemBannerDetails

    const hours = Math.floor(runtime / 60)
    const minutes = runtime - hours * 60
    const censorCert = adult ? 'A' : 'U/A'
    const date = releaseDate.split('-')

    // console.log(voteCount)
    // console.log(minutes)
    // console.log(censorCert)

    return (
      <>
        <MovieItemBg movieItemBgSm={posterPath} movieItemBgLg={backdropPath}>
          <div className="linear-extra">
            <div className="movie-item-content-container">
              <h1 className="title">{title}</h1>
              <div className="duration-year-container">
                <p className="dates-duration-details">
                  {hours}h {minutes}m
                </p>
                <p className="dates-duration-details-censor">{censorCert}</p>
                <p className="dates-duration-details">{date[0]}</p>
              </div>
              <p className="over-view">{overview}</p>
              <div>
                <button type="button" className="movie-play-button">
                  Play
                </button>
              </div>
            </div>
          </div>
        </MovieItemBg>
        <div className="movie-item-detailed-view-container">
          <div className="need">
            <div className="movie-details-container">
              <h1 className="movie-detail-headings">Genres</h1>
              <ul className="list-items-movie-item">
                {genresList.map(each => (
                  <li key={each.id}>
                    <p className="texts">{each.name}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="movie-details-container">
              <h1 className="movie-detail-headings">Audio Available</h1>
              <ul className="list-items-movie-item">
                {languages.map(each => (
                  <li key={each.languagesId}>
                    <p className="texts">{each.language}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="movie-details-container">
                <h1 className="movie-detail-headings">Rating Count</h1>
                <p className="texts">{voteCount}</p>
              </div>

              <div className="movie-details-container">
                <h1 className="movie-detail-headings">Rating Average</h1>
                <p className="texts">{voteAverage}</p>
              </div>
            </div>

            <div>
              <div className="movie-details-container">
                <h1 className="movie-detail-headings">Budget</h1>
                <p className="texts">{budget}</p>
              </div>

              <div className="movie-details-container">
                <h1 className="movie-detail-headings">Release Date</h1>
                <p className="texts">{releaseDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="similar-movies-container">
          <h1 className="similar-movies-heading">More like this </h1>
          <ul className="similar-movies-lists-container">
            {similarMoviesList.map(each => (
              <li>
                <img
                  src={each.posterPath}
                  alt={each.title}
                  className="similar-images"
                />
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </>
    )
  }

  renderMovieItemDetailsView = () => {
    const {movieItemApiStatus} = this.state
    switch (movieItemApiStatus) {
      case apiStatusConstants.success:
        return this.renderMovieItemSuccessView()
      case apiStatusConstants.failure:
        return this.renderMovieItemFailureView()
      case apiStatusConstants.inProgress:
        return this.renderMovieItemLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-home-container">
        <Header />
        <div>{this.renderMovieItemDetailsView()}</div>
      </div>
    )
  }
}

export default MovieItem