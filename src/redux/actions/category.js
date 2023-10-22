import request from "../../server"
import CATEGORY_ACTIONS from "../types/category"
// import { CATEGORIES, CATEGORY_LOADING, CATEGORY_TOTAL } from "../types/category"

const updateStateChange = (payload) =>{
  return ({type : CATEGORY_ACTIONS , payload})
}

const getCategories = (search)=>{
  return async (dispatch)=>{
    try {
      dispatch(updateStateChange({loading : true}))
      const {data : {data , pagination :{total}}} = await request.get(`category?search=${search}`)
      dispatch(updateStateChange({categories : data}))
      dispatch(updateStateChange({total : total}))
    } catch (err) {
      console.log(err);
    } finally{
      dispatch(updateStateChange({loading : false}))
    }
  }
}

const controlModal = (bool) => {
  return async (dispatch)=>{
    dispatch(updateStateChange({isModalOpen : bool}))
    dispatch(updateStateChange({imgData : null}))
    dispatch(updateStateChange({selected : null}))
  }
}

const uploadImg =  (file) =>{
  return async (dispatch)=>{
      const formData = new FormData()
      formData.append("file" , file)
      const {data} = await request.post("upload" , formData)
      dispatch(updateStateChange({imgData : data}))
  }
}


const sendCategory = (selected , values , search)=>{
  return async ()=>{
    if (selected === null) {
      await request.post("category" , values)
    } else{
      await request.put(`category/${selected}` , values)
      getCategories(search)
    }
  }
}



const deleteCategory = async (id , search)=>{
  request.delete(`category/${id}`)
  getCategories(search)
}


const editCategory = (id , form)=>{
  return async (dispatch)=>{
    const {data} =  await request.get(`category/${id}`)
    dispatch(updateStateChange({imgData : data.photo}))
    dispatch(updateStateChange({selected : id}))
    form.setFieldsValue(data)
  }
}


export {controlModal , deleteCategory , editCategory , sendCategory , uploadImg}

export default getCategories