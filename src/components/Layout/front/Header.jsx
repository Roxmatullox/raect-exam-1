import "./Layout.scss"

import NavLogo from "../../../assets/images/nav-logo.svg";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Header = () => {

  const {isAuth , role} = useContext(AuthContext)

  return (
    <header className="header">
      <div className="container">
        <nav>
          <div className="header-left">
            {
              isAuth ? <>{role==="admin" ? <><NavLink to="dashboard">Dashboard</NavLink> <a>||</a> <NavLink to="myPosts">My posts</NavLink></> : <NavLink to="myPosts">My posts</NavLink> }</> : <NavLink to=""><img src={NavLogo} alt="" /></NavLink> 
            }
          </div>
          <div className="header-right">
            <NavLink to="">Home</NavLink>
            <NavLink to="all-posts">Blog</NavLink>
            <NavLink to="about">About Us</NavLink>
            <NavLink to="register">Register</NavLink>
            {
              isAuth ? <NavLink to="account"><button>Account</button></NavLink> : <NavLink to="login"><button>Login</button></NavLink> 
            }
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header