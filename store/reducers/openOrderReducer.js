import {
    SET_ACTIVE_OPEN_ORDER,
    OPEN_ORDERS_ERROR,
    OPEN_ORDERS_LOADING,
    SET_OPEN_ORDERS
} from '../../constants/actions'

const initialState = {
    openOrders: [],
    openOrdersLoading: false,
    openOrdersError: false,
    activeOpenOrder: null
}

const openOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_OPEN_ORDER:
            return {
                ...state,
                openOrdersLoading: false,
                openOrdersError: false,
                activeOpenOrder: action.payload
            }
        case OPEN_ORDERS_LOADING:
            return {
                ...state,
                openOrdersLoading: true,
                openOrdersError: false
            }
        case OPEN_ORDERS_ERROR:
            return {
                ...state,
                openOrdersLoading: false,
                openOrdersError: true
            }
        case SET_OPEN_ORDERS:
            return {
                ...state,
                openOrdersLoading: false,
                openOrdersError: false,
                openOrders: action.payload
            }
        default:
            return state
    }
}

export default openOrderReducer
