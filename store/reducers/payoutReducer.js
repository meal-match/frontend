import {
    CLEAR_PAYOUT_SETUP,
    PAYOUT_ERROR,
    PAYOUT_LOADING,
    SET_PAYOUT_METHODS,
    SET_PAYOUT_SETUP
} from '@constants'

const initialState = {
    loading: false,
    error: false,
    methods: {},
    setupInfo: {}
}

const payoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYOUT_LOADING:
            return {
                ...state,
                loading: true,
                error: false
            }
        case PAYOUT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload || true
            }
        case SET_PAYOUT_METHODS:
            return {
                ...state,
                loading: false,
                error: false,
                methods: action.payload
            }
        case SET_PAYOUT_SETUP:
            return {
                ...state,
                loading: false,
                error: false,
                setupInfo: action.payload
            }
        case CLEAR_PAYOUT_SETUP:
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

export default payoutReducer
