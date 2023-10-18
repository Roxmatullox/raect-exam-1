
import creativs from "../../assets/images/creativs.svg";
import Blog from "../../assets/images/Blog.svg";


import "./AboutPage.scss"

const AboutUsPage = () => {
  return (
    <main>
      <div className="container">
        <div className="about-page">
          <section id="our-goals">
            <div className="mision">
              <h4>Our mision</h4>
              <h2>Creating valuable content for creatives all around the world</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.</p>
            </div>
            <div className="vision">
              <h4>Our Vision</h4>
              <h2>A platform that empowers individuals to improve</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.</p>
            </div>
          </section>
          <section id="our-creativs">
            <div className="creativs-text">
              <h2>Our team of creatives</h2>
              <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
            </div>
            <div className="creativs-img">
              <img src={creativs} alt="" />
            </div>
          </section>
          <section id="our-creativs">
            <div className="creativs-img">
              <img src={Blog} alt="" />
            </div>
            <div className="creativs-text">
              <h2>Why we started this Blog</h2>
              <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default AboutUsPage