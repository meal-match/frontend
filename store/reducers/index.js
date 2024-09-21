import { combineReducers } from 'redux'

import authReducer from './authReducer'
import profileReducer from './profileReducer'
import mealReducer from './mealReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    meal: mealReducer
})

export default rootReducer
