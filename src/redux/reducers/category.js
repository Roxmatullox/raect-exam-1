import { CATEGORIES, LOADING, TOTAL } from "../types/category"

const initialState = {
  categories : [],
  total : 0,
  loading : false
}

const CategoryReducer = ( state = initialState ,{ type , payload }  )=>{
  switch (type) {
    case CATEGORIES:
      return {...state , categories : payload}
    case TOTAL:
      return {...state , total : payload}
    case LOADING:
      return {...state , loading : payload}
  }

  return state
}

export default CategoryReducer