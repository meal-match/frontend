import {
    AUTH_ERROR,
    AUTH_LOADING,
    CHECK_AUTH_FAIL,
    CREATE_USER,
    RESET_EMAIL_SENT,
    USER_LOGIN,
    USER_LOGOUT
} from '@constants'

export const userLogin = (params) => async (dispatch, getState) => {
    const { auth } = getState()
    if (auth.authLoading || auth.isLoggedIn) {
        return
    }

    try {
        dispatch({
            type: AUTH_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
            {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        )

        if (request.status === 200) {
            dispatch({
                type: USER_LOGIN
            })
        } else {
            const response = await request.json()
            dispatch({
                type: AUTH_ERROR,
                payload: {
                    type: 'userLogin',
                    message: response.message
                }
            })
        }
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: {
                type: 'userLogin',
                message: 'An unknown error occured'
            }
        })
    }
}

export const createUser = (params) => async (dispatch, getState) => {
    const { auth } = getState()
    if (auth.authLoading || auth.isLoggedIn) {
        return
    }

    try {
        dispatch({
            type: AUTH_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/auth/signup`,
            {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        )

        if (request.status === 201) {
            dispatch({
                type: CREATE_USER
            })
        } else {
            const response = await request.json()
            dispatch({
                type: AUTH_ERROR,
                payload: {
                    type: 'createUser',
                    message: response.message
                }
            })
        }
    } catch (e) {
        dispatch({
            type: AUTH_ERROR,
            payload: {
                type: 'createUser',
                message: 'An unknown error occured'
            }
        })
    }
}

export const sendResetEmail = (email) => async (dispatch, getState) => {
    const { auth } = getState()
    if (auth.authLoading || auth.isLoggedIn) {
        return
    }

    try {
        dispatch({
            type: AUTH_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/auth/send-reset`,
            {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        )

        if (request.status === 200) {
            dispatch({
                type: RESET_EMAIL_SENT
            })
        } else {
            const response = await request.json()
            dispatch({
                type: AUTH_ERROR,
                payload: {
                    type: 'sendResetEmail',
                    message: response.message
                }
            })
        }
    } catch (e) {
        dispatch({
            type: AUTH_ERROR,
            payload: {
                type: 'sendResetEmail',
                message: 'An unknown error occured'
            }
        })
    }
}

export const checkAuthStatus = async (dispatch, getState) => {
    const { auth } = getState()
    if (auth.authLoading) {
        return
    }

    try {
        dispatch({
            type: AUTH_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/auth/status`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        )

        if (request.status === 200) {
            dispatch({
                type: USER_LOGIN
            })
        } else {
            dispatch({
                type: CHECK_AUTH_FAIL
            })
        }
    } catch (e) {
        dispatch({
            type: CHECK_AUTH_FAIL
        })
    }
}

export const userLogout = async (dispatch, getState) => {
    const { auth } = getState()
    if (auth.authLoading || !auth.isLoggedIn) {
        return
    }

    try {
        dispatch({
            type: AUTH_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/auth/logout`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        )

        if (request.status === 200) {
            dispatch({
                type: USER_LOGOUT
            })
        } else {
            const response = await request.json()
            dispatch({
                type: AUTH_ERROR,
                payload: {
                    type: 'userLogout',
                    message: response.message
                }
            })
        }
    } catch (e) {
        dispatch({
            type: AUTH_ERROR,
            payload: {
                type: 'userLogout',
                message: 'An unknown error occured'
            }
        })
    }
}
