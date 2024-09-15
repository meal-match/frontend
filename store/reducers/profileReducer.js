import { PROFILE_LOADING, PROFILE_ERROR, SET_PROFILE } from '@constants'

const initialState = {
    firstName: null,
    lastName: null,
    email: null,
    loading: false,
    error: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                loading: false,
                error: null
            }
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true,
                error: null
            }
        case PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default profileReducer
