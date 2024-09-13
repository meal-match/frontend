import { SET_USER_LOGIN, CREATE_USER } from '@constants'

export const userLogin = async (dispatch) => {
    dispatch({
        type: SET_USER_LOGIN
    })
}

export const createUser = async (dispatch) => {
    dispatch({
        type: CREATE_USER
    })
}
