import {
    CLEAR_PAYMENT_SETUP,
    PAYMENT_ERROR,
    PAYMENT_LOADING,
    SET_PAYMENT_METHODS,
    SET_PAYMENT_SETUP
} from '@constants'

const initialState = {
    loading: false,
    error: false,
    methods: [],
    setupInfo: {}
}

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_LOADING:
            return {
                ...state,
                loading: true,
                error: false
            }
        case PAYMENT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload || true
            }
        case SET_PAYMENT_METHODS:
            return {
                ...state,
                loading: false,
                error: false,
                methods: action.payload || []
            }
        case SET_PAYMENT_SETUP:
            return {
                ...state,
                loading: false,
                error: false,
                setupInfo: action.payload
            }
        case CLEAR_PAYMENT_SETUP:
            return {
                ...state,
                loading: false,
                error: false,
                setupInfo: {}
            }
        default:
            return state
    }
}

export default paymentReducer
