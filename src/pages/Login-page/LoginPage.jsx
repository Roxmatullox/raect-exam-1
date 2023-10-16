
import Cookies from "js-cookie"
import request from "../../server"
import "./Login.scss"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {

  const {setIsAuth , setRole} = useContext(AuthContext)

  const navigate = useNavigate()

  const login = async (e) =>{
    e.preventDefault()
    try {
      const values = {
        username : e.target.username.value ,
        password : e.target.password.value
      }
      const {data} = await request.post("auth/login" , values)
      Cookies.set("isLogin" , data.token)
      Cookies.set("role" , data.role)
      setIsAuth(true)
      setRole(data.role)
      if (data.role === "admin") {
        navigate("/dashboard")
      } else{
        navigate("/myPosts")
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main>
      <div className="container">
        <div className="login-section">
          <h1>Login</h1>
          <form onSubmit={login}>
            <input required id="username" placeholder="Username" type="text" />
            <input required id="password" placeholder="Password" type="password" />
            <button type="submit" >Login</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default LoginPage