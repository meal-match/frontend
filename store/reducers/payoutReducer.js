import {
    PAYOUT_ERROR,
    PAYOUT_LOADING,
    SET_PAYOUT_ACCOUNT,
    SET_PAYOUT_ACCOUNT_SETUP_LINK,
    SET_PAYOUT_ACCOUNT_SETUP_STATUS
} from '@constants'

const initialState = {
    loading: false,
    error: null,
    account: null,
    accountSetupLink: null,
    setupIsComplete: false
}

const payoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case PAYOUT_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            }
        case PAYOUT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case SET_PAYOUT_ACCOUNT:
            return {
                ...state,
                loading: false,
                account: action.payload.account,
                setupIsComplete: action.payload.setupIsComplete
            }
        case SET_PAYOUT_ACCOUNT_SETUP_LINK:
            return {
                ...state,
                loading: false,
                accountSetupLink: action.payload
            }
        case SET_PAYOUT_ACCOUNT_SETUP_STATUS:
            return {
                ...state,
                loading: false,
                setupIsComplete: action.payload
            }
        default:
            return state
    }
}

export default payoutReducer
