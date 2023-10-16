import { useState , createContext} from "react"
import PropTypes from "prop-types"
import Cookies from "js-cookie"

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {

  const [isAuth , setIsAuth] = useState(Cookies.get("isLogin") ? true : false)

  const [role , setRole] = useState( Cookies.get("role") || "user")


  const state = {
    isAuth,
    role,
    setIsAuth,
    setRole,
  }

  return (
    <AuthContext.Provider value={state} >{children}</AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children : PropTypes.node
}

export default AuthContextProvider