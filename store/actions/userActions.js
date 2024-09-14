import { SET_USER_LOGIN, CREATE_USER } from '@constants'

export const userLogin = (email, password) => async (dispatch) => {
    try {
        const request = await fetch(
            'https://backend-red-seven-72.vercel.app/auth/login',
            {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        )
        console.log('request', request)
        dispatch({
            type: SET_USER_LOGIN
        })
    } catch (error) {
        // console.error('Error logging in user:', error)
    }
}

export const createUser = async (dispatch) => {
    dispatch({
        type: CREATE_USER
    })
}
