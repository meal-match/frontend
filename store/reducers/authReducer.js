import {
    AUTH_ERROR,
    USER_LOGIN,
    CREATE_USER,
    AUTH_LOADING,
    USER_LOGOUT,
    RESET_EMAIL_SENT,
    PASSWORD_RESET
} from '@constants'

const initialState = {
    isLoggedIn: false,
    authError: null,
    authLoading: false,
    resetEmailSent: false,
    passwordReset: false,
    createAccount: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                authLoading: false,
                authError: null
            }
        case CREATE_USER:
            return {
                ...state,
                authLoading: false,
                authError: null,
                createAccount: true
            }
        case AUTH_ERROR:
            return {
                ...state,
                authError: action.payload,
                authLoading: false,
                createAccount: false
            }
        case AUTH_LOADING:
            return {
                ...state,
                authLoading: true,
                authError: null,
                createAccount: false
            }
        case USER_LOGOUT:
            return initialState
        case RESET_EMAIL_SENT:
            return {
                ...state,
                authLoading: false,
                resetEmailSent: true,
                authError: null
            }
        case PASSWORD_RESET:
            return {
                ...state,
                authLoading: false,
                passwordReset: true,
                isLoggedIn: false,
                authError: null
            }
        default:
            return state
    }
}

export default authReducer
