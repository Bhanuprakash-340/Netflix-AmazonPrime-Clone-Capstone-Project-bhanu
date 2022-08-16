import {GoAlert} from 'react-icons/go'
import './index.css'

const Failure = props => {
  const {onRetry} = props

  const onClickRetry = () => {
    onRetry()
  }

  return (
    <div className="error-container-bg">
      <GoAlert className="triangle-bg" />
      <p className="error-text-bg">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-button-bg"
        onClick={onClickRetry}
      >
        {' '}
        Try Again
      </button>
    </div>
  )
}

export default Failure
