import { SET_USER_LOGIN } from '@constants'

export const userLogin = async (dispatch) => {
    dispatch({
        type: SET_USER_LOGIN
    })
}
