import {FaYoutube, FaTwitter, FaGoogle, FaInstagram} from 'react-icons/fa'
// import {FcGoogle} from 'react-icons/fc'
import './index.css'

const Footer = () => (
  <>
    <footer className="footer-section">
      <div className="icons-container">
        <FaGoogle className="google" />
        <FaTwitter className="twitter" />
        <FaInstagram className="instagram" />
        <FaYoutube className="youtube" />
      </div>
      <p className="contact">Contact Us</p>
    </footer>
  </>
)

export default Footer
