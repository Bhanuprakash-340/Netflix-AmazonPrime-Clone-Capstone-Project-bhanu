import {BsTwitter, BsInstagram} from 'react-icons/bs'
import {FaYoutube} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'
import './index.css'

const Footer = () => (
  <>
    <footer className="footer-section">
      <div className="icons-container">
        <FcGoogle className="google" />
        <BsTwitter className="twitter" />
        <BsInstagram className="instagram" />
        <FaYoutube className="youtube" />
      </div>
      <p className="contact">Contact Us</p>
    </footer>
  </>
)

export default Footer
