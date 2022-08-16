import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <h1 className="not-found-heading">Lost Your Way ?</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <div>
      <Link to="/">
        <button type="button" className="not-found-page-button">
          Go to Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
