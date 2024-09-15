import {
    AUTH_LOADING,
    AUTH_ERROR,
    USER_LOGIN,
    CREATE_USER,
    RESET_EMAIL_SENT,
    PASSWORD_RESET
} from '@constants'

export const userLogin = (params) => async (dispatch) => {
    try {
        dispatch({
            type: AUTH_LOADING
        })

        const request = await fetch(
            // eslint-disable-next-line no-undef
            process.env.EXPO_PUBLIC_API_URL + '/auth/login',
            {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        )
        const response = await request.json()

        if (response.status === 200) {
            dispatch({
                type: USER_LOGIN
            })
        } else {
            dispatch({
                type: AUTH_ERROR,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const createUser = (params) => async (dispatch) => {
    try {
        dispatch({
            type: AUTH_LOADING
        })

        const request = await fetch(
            // eslint-disable-next-line no-undef
            process.env.EXPO_PUBLIC_API_URL + '/auth/signup',
            {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        )
        const response = await request.json()

        if (response.status === 201) {
            dispatch({
                type: CREATE_USER
            })
        } else {
            dispatch({
                type: AUTH_ERROR,
                payload: response.message
            })
        }
    } catch (e) {
        dispatch({
            type: AUTH_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const sendResetEmail = (email) => async (dispatch) => {
    try {
        dispatch({
            type: AUTH_LOADING
        })

        const request = await fetch(
            // eslint-disable-next-line no-undef
            process.env.EXPO_PUBLIC_API_URL + '/auth/send-reset',
            {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        )
        const response = await request.json()

        if (response.status === 200) {
            dispatch({
                type: RESET_EMAIL_SENT
            })
        } else {
            dispatch({
                type: AUTH_ERROR,
                payload: response.message
            })
        }
    } catch (e) {
        dispatch({
            type: AUTH_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const resetPassword = (params) => async (dispatch) => {
    try {
        dispatch({
            type: AUTH_LOADING
        })

        const request = await fetch(
            // eslint-disable-next-line no-undef
            process.env.EXPO_PUBLIC_API_URL + '/auth/reset-password',
            {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        )
        const response = await request.json()

        if (response.status === 200) {
            dispatch({
                type: PASSWORD_RESET
            })
        } else {
            dispatch({
                type: AUTH_ERROR,
                payload: response.message
            })
        }
    } catch (e) {
        dispatch({
            type: AUTH_ERROR,
            payload: 'An unknown error occured'
        })
    }
}
