import {FaYoutube, FaTwitter, FaGoogle, FaInstagram} from 'react-icons/fa'
// import {FcGoogle} from 'react-icons/fc'
import './index.css'

const Footer = () => (
  <>
    <footer className="footer-section">
      <div className="icons-container">
        <div>
          <FaGoogle className="google" />
        </div>
        <div>
          <FaTwitter className="twitter" />
        </div>
        <div>
          <FaInstagram className="instagram" />
        </div>
        <div>
          <FaYoutube className="youtube" />
        </div>
      </div>
      <p className="contact">Contact us</p>
    </footer>
  </>
)

export default Footer
