import {
    SET_ENTREE,
    SET_SIDE,
    SET_DRINK,
    SET_SAUCE,
    ORDER_MEAL,
    MEAL_ERROR,
    GET_MEAL_DATA,
    SET_MEAL_DATA,
    MEAL_LOADING
} from '@constants'

const initialState = {
    mealData: {},
    order: {
        entree: null,
        side: null,
        drink: null,
        sauce: null
    },
    loading: false,
    error: null
}

const mealReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ENTREE:
            return {
                ...state,
                order: {
                    ...state.order,
                    entree: action.payload
                },
                loading: false,
                error: null
            }
        case SET_SIDE:
            return {
                ...state,
                order: {
                    ...state.order,
                    side: action.payload
                },
                loading: false,
                error: null
            }
        case SET_DRINK:
            return {
                ...state,
                order: {
                    ...state.order,
                    drink: action.payload
                },
                loading: false,
                error: null
            }
        case SET_SAUCE:
            return {
                ...state,
                order: {
                    ...state.mealData,
                    sauce: action.payload
                },
                loading: false,
                error: null
            }
        case ORDER_MEAL:
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
        default:
            return state
    }
}

export default mealReducer
