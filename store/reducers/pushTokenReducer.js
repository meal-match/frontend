import {
    SET_PUSH_TOKEN,
    SET_PUSH_TOKEN_ERROR,
    SET_PUSH_TOKEN_LOADING
} from '@constants'

const initialState = {
    pushToken: null,
    loading: false,
    error: null
}

const pushTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PUSH_TOKEN:
            return {
                ...state,
                pushToken: action.payload,
                loading: false,
                error: null
            }
        case SET_PUSH_TOKEN_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            }
        case SET_PUSH_TOKEN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default pushTokenReducer
