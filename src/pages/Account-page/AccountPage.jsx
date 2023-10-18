import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./AccountPage.scss";
import { Fragment, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import request from "../../server";
import { Button, Upload } from "antd";
import Loading from "../Loading/Loading";

const AccountPage = () => {
  const navigate = useNavigate()

  const [ loading , setLoading] = useState()

  const [loadingBtn , setLoadingBtn] = useState(false)
  const [passwordLoadingBtn , setPasswordLoadingBtn] = useState(false)


  const {user , setIsAuth , setRole ,getUser} = useContext(AuthContext)
  
  const [confirmPasswordErr , setConfirmPasswordErr] = useState()

  const logout = () => {
    const LogoutConfirm = confirm("Siz rostanxam Akkountdan chiqishni istaysixmi ?")

    if (LogoutConfirm) {
      Cookies.remove("isLogin");
      localStorage.removeItem("role");
      setIsAuth(false);
      setRole(null);
      navigate("/");
    }
  };

  const [values , setValues] = useState(
    {
      photo : user?.photo,
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
        photo : user?.photo,
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


  const save = async (e) =>{
    e.preventDefault()
    try {
      loading(true)
      setLoadingBtn(true)
      await request.put("auth/details" , values)
      getUser()
    } catch (err) {
      console.log(err);
    } finally{
      setLoadingBtn(false)
      setLoading(false)
    }
  }

 


  const getValues =  (e) =>{
    setValues({...values , 
      [e.target.name]:e.target.value
    })
  }



  const updatePassword = async (e) =>{
    e.preventDefault()
    const newPassword = {
      "currentPassword" : e.target.currentPassword.value,
      "newPassword" : e.target.newPassword.value
    }

    try {
      setLoading(true)
      setPasswordLoadingBtn(true)
      if (e.target.newPassword.value === e.target.confirmPassword.value) {
        await request.put("auth/password" , newPassword)
      } else{
        setConfirmPasswordErr(true)
      }
    } catch (err) {
      console.log(err);
    } finally{
      setLoading(false)
      setPasswordLoadingBtn(false)
    }
  }




  return (
    <main>
      {
        loading ? <Loading /> : <Fragment>
          <div className="container">
          <h1>Account</h1>
            <div className="account-page">
              <div className="account-page-img">
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  // beforeUpload={beforeUpload}
                  onChange={getImg}
                >
                  {values.photo ? (
                    <img
                      src={`https://ap-blog-backend.up.railway.app/upload/${values.photo}`}
                      alt="avatar"
                      style={{
                        height: '100%',
                        width : "100%"
                      }}
                    />
                  ) : (
                    <p>Upload</p>
                  )}
                </Upload>
                <div className="password-update">
                  <h3>Update password</h3>
                  <form onSubmit={updatePassword}>
                    <input required  name="currentPassword" placeholder="Old Password" type="password" />
                    <input required  name="newPassword" placeholder="New Password" type="password" />
                    <input required  name="confirmPassword" placeholder="Confirm Password" type="password" />
                    {
                      confirmPasswordErr ? <p>Parolni qayta tekshing !</p> : ""
                    }
                    <Button loading={passwordLoadingBtn} htmlType="submit" >Update password</Button>
                  </form>
                </div>
              </div>
              <div className="account-page-inputs">
                <form onChange={getValues} onSubmit={save} >
                  <input required value={values.first_name} name="first_name" placeholder="Firstname" type="text" />
                  <input required value={values.last_name} name="last_name" placeholder="Lastname" type="text" />
                  <input required value={values.username}  name="username" placeholder="Username" type="text" />
                  <input value={values.info} name="info" placeholder="Info" type="text" />
                  <input value={values.phoneNumber} name="phoneNumber" placeholder="Phone number" type="text" />
                  <input value={values?.birthday?.split("T")[0]} name="birthday" placeholder="Birthday" type="date" />
                  <input value={values.address} name="address" placeholder="Address" type="text" />  
                  <input value={values.email} name="email" placeholder="email" type="email" /> 
                  <Button htmlType="submit" loading={loadingBtn}>Save</Button>
                </form> 
              </div>
            <button className="logout-btn" onClick={logout}>Logout</button>
            </div>
          </div>
        </Fragment>
      }
    </main>
  )
}

export default AccountPage