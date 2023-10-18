import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./AccountPage.scss";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AccountPage = () => {
  const navigate = useNavigate()


  const {user , setIsAuth , setRole} = useContext(AuthContext)

  const logout = () => {
    Cookies.remove("isLogin");
    localStorage.removeItem("role");
    setIsAuth(false);
    setRole(null);
    navigate("/");
  };

  const [values , setValues] = useState(
    {
      first_name:user?.first_name,
      last_name : user?.last_name,
      username:user?.username,
      info : user?.info,
      phoneNumber:user?.phoneNumber,
      birthday : user?.birthday,
      address : user?.address,
      email : user?.email,
    }
  )

  useEffect(()=>{
    setValues(
      {
        first_name:user?.first_name,
        last_name : user?.last_name,
        username:user?.username,
        info : user?.info,
        phoneNumber:user?.phoneNumber,
        birthday : user?.birthday,
        address : user?.address,
        email : user?.email,
      }
    )
  } , [user])


  const save = (e) =>{
    e.preventDefault()
    console.log(values);
  }



  return (
    <main>
      <div className="container">
        <div className="account-page">
          <div className="account-page-img">
            <input type="file" />
          </div>
          <div className="account-page-inputs">
            <form onSubmit={save} onChange={getValues} >
              <input required value={values.first_name} name="first_name" placeholder="Firstname" type="text" />
              <input required value={values.last_name} name="last_name" placeholder="Lastname" type="text" />
              <input required value={values.username}  name="username" placeholder="Username" type="text" />
              <input value={values.info} name="info" placeholder="Info" type="text" />
              <input value={values.phoneNumber} name="phoneNumber" placeholder="Phone number" type="text" />
              <input value={values.birthday} name="birthday" placeholder="Birthday" type="date" />
              <input value={values.address} name="address" placeholder="Address" type="text" />  
              <input value={values.email} name="email" placeholder="email" type="email" /> 
              <button type="submit">Save</button>  
            </form> 
          </div>
        </div>
        <button onClick={logout}>Logout</button>
      </div>
    </main>
  )
}

export default AccountPage