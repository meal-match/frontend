import {
    SET_PUSH_TOKEN,
    SET_PUSH_TOKEN_ERROR,
    SET_PUSH_TOKEN_LOADING
} from '@constants'

export const setPushToken = (token) => async (dispatch, getState) => {
    const { pushToken } = getState()
    if (pushToken.loading || pushToken.pushToken === token) {
        return
    }

    try {
        dispatch({
            type: SET_PUSH_TOKEN_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/push-token`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ pushToken: token })
            }
        )
        const response = await request.json()

        if (request.status === 200 || request.status === 201) {
            dispatch({
                type: SET_PUSH_TOKEN,
                payload: token
            })
        } else {
            dispatch({
                type: SET_PUSH_TOKEN_ERROR,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: SET_PUSH_TOKEN_ERROR,
            payload: 'An unknown error occured'
        })
    }
}
