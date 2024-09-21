import {
    SET_ENTREE,
    SET_SIDE,
    SET_DRINK,
    SET_SAUCE,
    ORDER_MEAL
} from '@constants'

const initialState = {
    mealData: {},
    loading: false,
    error: null
}

const mealReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ENTREE:
            return {
                ...state,
                mealData: {
                    ...state.mealData,
                    entree: action.payload
                },
                loading: false,
                error: null
            }
        case SET_SIDE:
            return {
                ...state,
                mealData: {
                    ...state.mealData,
                    side: action.payload
                },
                loading: false,
                error: null
            }
        case SET_DRINK:
            return {
                ...state,
                mealData: {
                    ...state.mealData,
                    drink: action.payload
                },
                loading: false,
                error: null
            }
        case SET_SAUCE:
            return {
                ...state,
                mealData: {
                    ...state.mealData,
                    sauce: action.payload
                },
                loading: false,
                error: null
            }
        case ORDER_MEAL:
            return {
                ...state,
                loading: true,
                error: null
            }
        default:
            return state
    }
}

export default mealReducer
