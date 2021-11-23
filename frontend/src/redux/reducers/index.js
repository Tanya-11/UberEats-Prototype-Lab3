import { combineReducers } from 'redux'
import {
    userSignupReducer,
    restLoginReducer,
    userLoginReducer,
    restSignupReducer,
    orderCountReducer,
} from './reducers'
import * as ACTIONS from '../actions/actions'

const appReducer = combineReducers({
    userSignUp: userSignupReducer,
    restSignUp: restSignupReducer,
    restLogin: restLoginReducer,
    userLogin: userLoginReducer,
    cart: orderCountReducer,
})

const rootReducer = (state, action) => {
    if (action.type === ACTIONS.USER_LOGOUT || action.type === ACTIONS.RESTAURANT_LOGOUT) {
        localStorage.removeItem('persist:root')
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export default rootReducer
