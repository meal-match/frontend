import {
    CLAIM_ORDER,
    CLAIM_ORDER_LOADING,
    CLAIM_ORDER_ERROR,
    ORDERS_INITIAL_LOADING,
    ORDERS_LOADING,
    SET_ORDERS,
    GET_ORDERS_ERROR,
    UNCLAIM_ORDER
} from '@constants'

const initialState = {
    orders: [],
    ordersLoading: false,
    ordersInitialLoading: null,
    ordersError: null,
    claimedOrder: null,
    claimedOrderLoading: false,
    claimedOrderError: null
}

const sellReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                ordersLoading: false,
                ordersInitialLoading: false,
                ordersError: null
            }
        case ORDERS_INITIAL_LOADING:
            return {
                ...state,
                ordersInitialLoading: true,
                ordersLoading: true,
                ordersError: null
            }
        case ORDERS_LOADING:
            return {
                ...state,
                ordersLoading: true,
                ordersError: null
            }
        case GET_ORDERS_ERROR:
            return {
                ...state,
                ordersLoading: false,
                ordersError: action.payload
            }
        case CLAIM_ORDER:
            return {
                ...state,
                claimedOrder: action.payload,
                claimedOrderLoading: false,
                claimedOrderError: null
            }
        case CLAIM_ORDER_LOADING:
            return {
                ...state,
                claimedOrderLoading: true,
                claimedOrderError: null
            }
        case CLAIM_ORDER_ERROR:
            return {
                ...state,
                claimedOrderLoading: false,
                claimedOrderError: action.payload
            }
        case UNCLAIM_ORDER:
            return {
                ...state,
                claimedOrder: null,
                claimedOrderLoading: false,
                claimedOrderError: null
            }
        default:
            return state
    }
}

export default sellReducer
