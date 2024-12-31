import {
    PAYMENT_LOADING,
    PAYMENT_METHOD_SAVED,
    PAYMENT_SETUP,
    PAYMENT_SETUP_ERROR
} from '@constants'

const initialState = {
    paymentLoading: false,
    paymentSetup: {},
    paymentSetupError: false,
    paymentSetupSaved: null
}

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYMENT_LOADING:
            return {
                ...state,
                paymentLoading: true,
                paymentSetupError: false
            }
        case PAYMENT_SETUP:
            return {
                ...state,
                paymentLoading: false,
                paymentSetup: action.payload,
                paymentSetupError: false
            }
        case PAYMENT_SETUP_ERROR:
            return {
                ...state,
                paymentLoading: false,
                paymentSetup: {},
                paymentSetupError: true
            }
        case PAYMENT_METHOD_SAVED:
            return {
                ...state,
                paymentLoading: false,
                paymentSetupSaved: action.payload
            }
        default:
            return state
    }
}

export default paymentReducer
