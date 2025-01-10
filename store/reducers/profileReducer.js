import {
    PROFILE_LOADING,
    PROFILE_ERROR,
    SET_PROFILE,
    SET_SELECTED_ORDER
} from '@constants'

const initialState = {
    profileData: {},
    selectedOrder: null,
    loading: false,
    error: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profileData: action.payload,
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
        case SET_SELECTED_ORDER:
            return {
                ...state,
                selectedOrder: action.payload
            }
        default:
            return state
    }
}

export default profileReducer
