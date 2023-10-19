import request from "../../server"
import { USERS, USERS_LOADING, USERS_TOTAL } from "../types/users"

const getUsers = (active)=>{
  return async (dispatch)=>{
    try {
      dispatch({type : USERS_LOADING , payload : true})
      const {data : {data , pagination :{total}}} = await request.get(`user?page=${active}`)
      dispatch({type : USERS ,  payload : data})
      dispatch({type : USERS_TOTAL ,  payload : total})
    } catch (err) {
      console.log(err);
    } finally{
      dispatch({type : USERS_LOADING ,  payload : false})
    }
  }
}

export default getUsers