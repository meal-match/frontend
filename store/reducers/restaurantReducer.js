import {
    MEAL_ERROR,
    GET_MEAL_DATA,
    SET_MEAL_DATA,
    SET_RESTAURANT_DATA,
    MEAL_LOADING
} from '@constants'

const initialState = {
    mealData: [],
    restaurantData: {},
    loading: false,
    error: null
}

const restaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case MEAL_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            }
        case MEAL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case GET_MEAL_DATA:
            return {
                ...state,
                loading: false,
                error: null
            }
        case SET_MEAL_DATA:
            return {
                ...state,
                mealData: action.payload,
                loading: false,
                error: null
            }
        case SET_RESTAURANT_DATA:
            return {
                ...state,
                restaurantData: action.payload,
                loading: false,
                error: null
            }
        default:
            return state
    }
}

export default restaurantReducer
