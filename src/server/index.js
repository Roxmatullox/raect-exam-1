import axios from "axios";
import Cookies from "js-cookie";

const request = axios.create({
  baseURL : "https://ap-blog-backend.up.railway.app/api/v1",
  timeout:10000,
  headers:{ Authorization : `Bearer ${Cookies.get("isLogin")}`}
})


export default request 