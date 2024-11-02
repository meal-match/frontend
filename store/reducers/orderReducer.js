import {
    SET_RESTAURANT,
    SET_ENTREE,
    SET_ENTREE_CUSTOMIZATIONS,
    SET_SIDE,
    SET_SIDE_CUSTOMIZATIONS,
    SET_DRINK,
    SET_DRINK_CUSTOMIZATIONS,
    SET_SAUCE,
    SET_PICKUP_TIME,
    ORDER_LOADING,
    ORDER_ERROR,
    ORDER_PLACED,
    ORDER_CANCELLED,
    CLEAR_ORDER
} from '@constants'

const initialState = {
    restaurant: null,
    entree: null,
    entreeCustomizations: [],
    side: null,
    sideCustomizations: [],
    drink: null,
    drinkCustomizations: [],
    sauce: [],
    pickupTime: new Date(),
    orderLoading: false,
    orderError: null,
    orderID: null
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RESTAURANT:
            return {
                ...state,
                restaurant: action.payload,
                orderLoading: false,
                orderError: null
            }
        case SET_ENTREE:
            return {
                ...state,
                entree: action.payload,
                orderLoading: false,
                orderError: null
            }
        case SET_ENTREE_CUSTOMIZATIONS:
            return {
                ...state,
                entreeCustomizations: action.payload,
                orderLoading: false,
                orderError: null
            }
        case SET_SIDE:
            return {
                ...state,
                side: action.payload,
                orderLoading: false,
                orderError: null
            }
        case SET_SIDE_CUSTOMIZATIONS:
            return {
                ...state,
                sideCustomizations: action.payload,
                orderLoading: false,
                orderError: null
            }
        case SET_DRINK:
            return {
                ...state,
                drink: action.payload,
                orderLoading: false,
                orderError: null
            }
        case SET_DRINK_CUSTOMIZATIONS:
            return {
                ...state,
                drinkCustomizations: action.payload,
                orderLoading: false,
                orderError: null
            }
        case SET_SAUCE:
            return {
                ...state,
                sauce: action.payload,
                orderLoading: false,
                orderError: null
            }
        case SET_PICKUP_TIME:
            return {
                ...state,
                pickupTime: action.payload,
                orderLoading: false,
                orderError: null
            }
        case ORDER_LOADING:
            return {
                ...state,
                orderLoading: true,
                orderError: null
            }
        case ORDER_ERROR:
            return {
                ...state,
                orderLoading: false,
                orderError: action.payload
            }
        case ORDER_PLACED:
            return {
                ...state,
                orderID: action.payload,
                orderLoading: false,
                orderError: null
            }
        case ORDER_CANCELLED:
        case CLEAR_ORDER:
            return initialState
        default:
            return state
    }
}

export default orderReducer
