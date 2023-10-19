import request from "../../server"
import { CATEGORIES, LOADING, TOTAL } from "../types/category"

const getCategories = (search)=>{
  return async (dispatch)=>{
    try {
      dispatch({type : LOADING , payload : true})
      const {data : {data , pagination :{total}}} = await request.get(`category?search=${search}`)
      dispatch({type : CATEGORIES , payload : data})
      dispatch({type : TOTAL , payload : total})
    } catch (err) {
      console.log(err);
    } finally{
      dispatch({type : LOADING , payload : false})
    }
  }
}

export default getCategories