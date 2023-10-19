
import PropTypes from "prop-types"
import { Provider } from "react-redux"
import { applyMiddleware, combineReducers, createStore } from "redux"
import CategoryReducer from "../reducers/category"
import thunk from "redux-thunk"

const rootReducers = combineReducers({
  category : CategoryReducer
})

const Store = createStore( rootReducers , applyMiddleware(thunk))

const StoreProvider = ({children}) => {
  return (
    <Provider store={Store}>{children}</Provider>
  )
}

StoreProvider.propTypes = {
  children : PropTypes.node
}

export default StoreProvider