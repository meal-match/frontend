import {
    CLAIM_ORDER,
    CLAIM_ORDER_ERROR,
    CLAIM_ORDER_LOADING,
    CONFIRM_ORDER,
    GET_ORDERS_ERROR,
    ORDERS_INITIAL_LOADING,
    ORDERS_LOADING,
    SET_ORDERS,
    UNCLAIM_ORDER,
    SET_WAIT_TIME,
    SET_RECEIPT_URI,
    UNCONFIRM_ORDER
} from '@constants'

const initialState = {
    orders: [],
    ordersLoading: false,
    ordersInitialLoading: null,
    ordersError: null,
    claimedOrder: null,
    claimedOrderLoading: false,
    claimedOrderError: null,
    orderConfirmed: false
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
        case CONFIRM_ORDER:
            return {
                ...state,
                orders: state.orders.map((order) =>
                    order.id === action.payload.id ? action.payload : order
                ),
                claimedOrder: action.payload,
                claimedOrderLoading: false,
                claimedOrderError: null,
                orderConfirmed: true
            }
        case UNCONFIRM_ORDER:
            return {
                ...state,
                orderConfirmed: false,
                claimedOrder: null
            }
        case SET_WAIT_TIME:
            return {
                ...state,
                claimedOrder: {
                    ...state.claimedOrder,
                    waitTime: action.payload
                }
            }
        case SET_RECEIPT_URI:
            return {
                ...state,
                claimedOrder: {
                    ...state.claimedOrder,
                    receiptUri: action.payload
                }
            }
        default:
            return state
    }
}

export default sellReducer
