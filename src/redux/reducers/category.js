// import { CATEGORIES, CATEGORY_LOADING, CATEGORY_TOTAL } from "../types/category"

import CATEGORY_ACTIONS from "../types/category"

const initialState = {
  categories : [],
  total : 0,
  loading : false,
  isModalOpen : false , 
  isModalLoading : false , 
  selected : null ,
  imgData : null,
}

// const CategoryReducer = ( state = initialState ,{ type , payload }  )=>{
//   switch (type) {
//     case CATEGORIES:
//       return {...state , categories : payload}
//     case CATEGORY_TOTAL:
//       return {...state , total : payload}
//     case CATEGORY_LOADING:
//       return {...state , loading : payload}
//   }

//   return state
// }

const CategoryReducer = ( state = initialState ,{ type , payload }  )=>{
  switch (type) {
    case CATEGORY_ACTIONS:
      return {...state , ...payload}
  }

  return state
}

export default CategoryReducer