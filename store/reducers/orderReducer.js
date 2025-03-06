import {
    CLEAR_ORDER,
    ORDER_CANCELLED,
    ORDER_ERROR,
    ORDER_LOADING,
    ORDER_PLACED,
    SET_DRINK,
    ADD_DRINK_CUSTOMIZATIONS,
    SET_ENTREE,
    SET_ENTREE_CUSTOMIZATIONS,
    SET_ORDER_DISPUTED,
    SET_PICKUP_TIME,
    SET_RESTAURANT,
    SET_sauces,
    SET_SIDE,
    SET_SIDE_CUSTOMIZATIONS
} from '@constants'

const initialState = {
    restaurant: null,
    entree: null,
    entreeCustomizations: [],
    side: null,
    sideCustomizations: [],
    drink: null,
    drinkCustomizations: {},
    sauces: [],
    pickupTime: new Date(),
    orderLoading: false,
    orderError: null,
    orderID: null,
    openOrders: [],
    disputeSuccess: false
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
                entreeCustomizations: [],
                side: null,
                sideCustomizations: [],
                drink: null,
                drinkCustomizations: [],
                sauces: [],
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
                sideCustomizations: [],
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
                drinkCustomizations: [],
                orderLoading: false,
                orderError: null
            }
        case ADD_DRINK_CUSTOMIZATIONS:
            return {
                ...state,
                drinkCustomizations: {
                    ...state.drinkCustomizations,
                    [action.payload.key]: action.payload.value
                },
                orderLoading: false,
                orderError: null
            }
        case SET_sauces:
            return {
                ...state,
                sauces: action.payload,
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
        case SET_ORDER_DISPUTED:
            return {
                ...state,
                disputeSuccess: action.payload,
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
