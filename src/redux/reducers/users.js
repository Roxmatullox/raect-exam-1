import { USERS, USERS_LOADING, USERS_TOTAL } from "../types/users"

const initialState = {
  users : [],
  total : 0,
  loading : false
}

const UsersReducer = ( state = initialState ,{ type , payload }  )=>{
  switch (type) {
    case USERS:
      return {...state , users : payload}
    case USERS_TOTAL:
      return {...state , total : payload}
    case USERS_LOADING:
      return {...state , loading : payload}
  }

  return state
}

export default UsersReducer