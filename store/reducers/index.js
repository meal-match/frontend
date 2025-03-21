import { combineReducers } from 'redux'

import authReducer from './authReducer'
import orderReducer from './orderReducer'
import paymentReducer from './paymentReducer'
import payoutReducer from './payoutReducer'
import profileReducer from './profileReducer'
import pushTokenReducer from './pushTokenReducer'
import restaurantReducer from './restaurantReducer'
import sellReducer from './sellReducer'
import openOrderReducer from './openOrderReducer'

import { USER_LOGOUT } from '@constants'

const appReducer = combineReducers({
    auth: authReducer,
    order: orderReducer,
    openOrders: openOrderReducer,
    payment: paymentReducer,
    payout: payoutReducer,
    profile: profileReducer,
    restaurant: restaurantReducer,
    pushToken: pushTokenReducer,
    sell: sellReducer
})

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export default rootReducer
