import {
    AUTH_ERROR,
    AUTH_LOADING,
    CHECK_AUTH_FAIL,
    CREATE_USER,
    PASSWORD_RESET,
    RESET_EMAIL_SENT,
    USER_LOGIN,
    USER_LOGOUT,
    VERIFY_EMAIL
} from '@constants'

const defaultAuthError = {
    type: null,
    message: null
}

const initialState = {
    isLoggedIn: false,
    authError: defaultAuthError,
    authLoading: false,
    resetEmailSent: false,
    passwordReset: false,
    createAccount: false,
    checkAuthFail: false,
    verifyEmail: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                authLoading: false,
                authError: defaultAuthError,
                checkAuthFail: false
            }
        case CREATE_USER:
            return {
                ...state,
                authLoading: false,
                authError: defaultAuthError,
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
                authError: defaultAuthError,
                createAccount: false
            }
        case USER_LOGOUT:
            return initialState
        case RESET_EMAIL_SENT:
            return {
                ...state,
                authLoading: false,
                resetEmailSent: true,
                authError: defaultAuthError
            }
        case PASSWORD_RESET:
            return {
                ...state,
                authLoading: false,
                passwordReset: true,
                isLoggedIn: false,
                authError: defaultAuthError
            }
        case CHECK_AUTH_FAIL:
            return {
                ...initialState,
                checkAuthFail: true
            }
        case VERIFY_EMAIL:
            return {
                ...state,
                authLoading: false,
                authError: defaultAuthError,
                verifyEmail: true
            }
        default:
            return state
    }
}

export default authReducer
