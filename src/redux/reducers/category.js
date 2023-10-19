import { CATEGORIES, CATEGORY_LOADING, CATEGORY_TOTAL } from "../types/category"

const initialState = {
  categories : [],
  total : 0,
  loading : false
}

const CategoryReducer = ( state = initialState ,{ type , payload }  )=>{
  switch (type) {
    case CATEGORIES:
      return {...state , categories : payload}
    case CATEGORY_TOTAL:
      return {...state , total : payload}
    case CATEGORY_LOADING:
      return {...state , loading : payload}
  }

  return state
}

export default CategoryReducer