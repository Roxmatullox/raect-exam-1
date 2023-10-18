import { useState , createContext, useEffect} from "react"
import PropTypes from "prop-types"
import Cookies from "js-cookie"
import request from "../server"

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

  const [isAuth , setIsAuth] = useState(Cookies.get("isLogin") ? true : false)

  const [role , setRole] = useState( Cookies.get("role") || "user")

  const [ user , setUser] = useState(null)


  const getUser = async ()=>{
    try {
      const {data} = await request.get("auth/me" )
      setUser(data)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    getUser()
  } , [])


  const state = {
    isAuth,
    role,
    user ,
    setIsAuth,
    setRole,
    getUser,
  }

  return (
    <AuthContext.Provider value={state} >{children}</AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children : PropTypes.node
}

export default AuthContextProvider