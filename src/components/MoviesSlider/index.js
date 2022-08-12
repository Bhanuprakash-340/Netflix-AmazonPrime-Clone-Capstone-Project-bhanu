import {Link} from 'react-router-dom'
import './index.css'

const MoviesSlider = props => {
  const {movieDetails} = props
  const {posterPath, title, id} = movieDetails

  return (
    <div className="slick-item">
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt={title} className="logo-image" />
      </Link>
    </div>
  )
}

export default MoviesSlider
