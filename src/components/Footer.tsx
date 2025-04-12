import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faTelegram, faDiscord } from "@fortawesome/free-brands-svg-icons";
import "../styles/footer.css"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <div>
        <a href="#">Privacy Policy</a>
        </div>
        <div>
        <a href="#">Terms and Conditions</a>
        </div>
      </div>
      <div className="social-icons">
        <a href="#"><FontAwesomeIcon icon={faDiscord} className="icon"/></a>
        <a href="#"><FontAwesomeIcon icon={faFacebook} className="icon" /></a>
        <a href="#"><FontAwesomeIcon icon={faTwitter} className="icon" /></a>
        <a href="#"><FontAwesomeIcon icon={faInstagram} className="icon" /></a>
        <a href="#"><FontAwesomeIcon icon={faTelegram} className="icon"/></a>
      </div>
      <p>Copyright © Wordum</p>
    </footer>
  );
}