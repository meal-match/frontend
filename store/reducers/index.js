import { combineReducers } from 'redux'

import authReducer from './authReducer'
import orderReducer from './orderReducer'
import profileReducer from './profileReducer'
import restaurantReducer from './restaurantReducer'
import sellReducer from './sellReducer'

import { USER_LOGOUT } from '@constants'

const appReducer = combineReducers({
    auth: authReducer,
    order: orderReducer,
    profile: profileReducer,
    restaurant: restaurantReducer,
    sell: sellReducer
})

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export default rootReducer
