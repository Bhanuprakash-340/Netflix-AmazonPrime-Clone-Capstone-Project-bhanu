import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
// import {FcGoogle} from 'react-icons/fc'
import './index.css'

const Footer = () => (
  <>
    <div className="icons-container">
      <FaGoogle className="google" />
      <FaTwitter className="twitter" />
      <FaInstagram className="instagram" />
      <FaYoutube className="youtube" />
    </div>
    <p className="contact">Contact us</p>
    {/* <p className="contact">Contact us</p> */}
  </>
)

export default Footer
