import './index.css'

const Failure = props => {
  const {onRetry} = props

  const onClickRetry = () => {
    onRetry()
  }

  return (
    <div className="error-container">
      <img
        src="https://res.cloudinary.com/bhanu-prakash/image/upload/v1661339065/alert-triangle_1_p5grnb.png"
        alt="failure view"
        className="alert-icon-failure-view"
      />
      <p className="error-text">Something went wrong. Please try again</p>
      <button type="button" className="try-again-button" onClick={onClickRetry}>
        {' '}
        Try Again
      </button>
    </div>
  )
}

export default Failure
