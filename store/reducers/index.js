import { combineReducers } from 'redux'

import authReducer from './authReducer'
import profileReducer from './profileReducer'
import mealReducer from './mealReducer'
import { USER_LOGOUT } from '@constants'

const appReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    meal: mealReducer
})

const rootReducer = (state, action) => {
    if (action.type === USER_LOGOUT) {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

export default rootReducer
