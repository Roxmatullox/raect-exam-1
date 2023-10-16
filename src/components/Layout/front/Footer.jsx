
import "./Layout.scss";

import twitter from "../../../assets/images/twitter.svg"
import facebook from "../../../assets/images/facebook.svg"
import instagram from "../../../assets/images/instagram.svg"
import linkedin from "../../../assets/images/linkedin.svg"


const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-section">
          <div className="footer-left">
            <a href="">Finstreet 118 2561 Fintown</a>
            <a href="">Hello@finsweet.com  020 7993 2905</a>
          </div>
          <div className="footer-right">
            <img src={twitter} alt="" />
            <img src={facebook} alt="" />
            <img src={instagram} alt="" />
            <img src={linkedin} alt="" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer