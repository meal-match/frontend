import {
    OPEN_ORDERS_ERROR,
    OPEN_ORDERS_LOADING,
    SET_OPEN_ORDERS
} from '@constants'

const initialState = {
    openOrders: [],
    openOrdersLoading: false,
    openOrdersError: false
}

const openOrderReducer = (state = initialState, action) => {
    switch (action.type) {
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
