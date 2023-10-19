import request from "../../server"
import { CATEGORIES, CATEGORY_LOADING, CATEGORY_TOTAL } from "../types/category"

const getCategories = (search)=>{
  return async (dispatch)=>{
    try {
      dispatch({type : CATEGORY_LOADING , payload : true})
      const {data : {data , pagination :{total}}} = await request.get(`category?search=${search}`)
      dispatch({type : CATEGORIES ,  payload : data})
      dispatch({type : CATEGORY_TOTAL ,  payload : total})
    } catch (err) {
      console.log(err);
    } finally{
      dispatch({type : CATEGORY_LOADING ,  payload : false})
    }
  }
}

export default getCategories