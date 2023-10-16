
import { useContext, useState } from "react"
import "./Register.scss"
import request from "../../server"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import Cookies from "js-cookie"

const RegisterPage = () => {

  const {setIsAuth} = useContext(AuthContext)

  const navigate = useNavigate()

  const [isConfirm , setIsConfirm] = useState(true)

  const register = async (e) => {
    e.preventDefault()
    try {
      const values = {
        first_name : e.target.firstName.value ,
        last_name : e.target.lastName.value ,
        username : e.target.username.value ,
        password : e.target.password.value ,
      }

      let confirm = e.target.confirm.value

      if (values.password === confirm) {
        try {
          const {data} = await request.post("auth/register" , values)
          Cookies.set("isLogin" , data.token)
          setIsAuth(true)
          if (data.role === "admin") {
            navigate("/dashboard")
          } else{
            navigate("/account")
          }
        } catch (err) {
          console.log(err);
        }
      }else{
        setIsConfirm(false)
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main onSubmit={register}>
      <div className="container">
        <div className="register-section">
          <h1>Register</h1>
          <form >
            <input id="firstName" placeholder="Firstname" type="text" />
            <input id="lastName" placeholder="Lastname" type="text" />
            <input id="username" placeholder="Username" type="text" />
            <input id="password" placeholder="Password" type="password" />
            <input id="confirm" placeholder="Confirm password" type="password" />
            {
              isConfirm ? null : <p>Password false !</p>
            }
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default RegisterPage