import { SET_USER_LOGIN, CREATE_USER } from '@constants'

const initalState = {
    userName: null,
    isLoggedIn: false
}

const userReducer = (state = initalState, action) => {
    switch (action.type) {
        case SET_USER_LOGIN:
            return {
                ...state,
                isLoggedIn: true
            }
        case CREATE_USER:
            return {
                ...state,
                isLoggedIn: true
            }
        default:
            return state
    }
}

export default userReducer
