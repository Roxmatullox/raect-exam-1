import axios from "axios"

const imgRequest = axios.create({
  baseURL : "https://ap-blog-backend.up.railway.app",
  timeout:100000,
})

export default imgRequest