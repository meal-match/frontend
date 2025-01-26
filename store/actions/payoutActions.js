import {
    CLEAR_PAYOUT_SETUP,
    PAYOUT_ERROR,
    PAYOUT_LOADING,
    SET_PAYOUT_METHODS,
    SET_PAYOUT_SETUP
} from '@constants'

export const setDefaultPayoutMethod =
    (payoutMethodID) => async (dispatch, getState) => {
        const { payout } = getState()
        if (payout.loading) {
            return
        }

        try {
            dispatch({
                type: PAYOUT_LOADING
            })

            const request = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/payout/default-method/${payoutMethodID}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            )
            const response = await request.json()

            if (request.status === 200) {
                dispatch({
                    type: SET_PAYOUT_METHODS,
                    payload: response.payoutMethods
                })
            } else {
                dispatch({
                    type: PAYOUT_ERROR,
                    payload: response.message
                })
            }
        } catch (e) {
            dispatch({
                type: PAYOUT_ERROR,
                payload: 'An unknown error occured'
            })
        }
    }

export const deletePayoutMethod =
    (payoutMethodID) => async (dispatch, getState) => {
        const { payout } = getState()
        if (payout.loading) {
            return
        }

        try {
            dispatch({
                type: PAYOUT_LOADING
            })

            const request = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/payout/${payoutMethodID}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                }
            )
            const response = await request.json()

            if (request.status === 200) {
                dispatch({
                    type: SET_PAYOUT_METHODS,
                    payload: response.payoutMethods
                })
            } else {
                dispatch({
                    type: PAYOUT_ERROR,
                    payload: response.message
                })
            }
        } catch (e) {
            dispatch({
                type: PAYOUT_ERROR,
                payload: 'An unknown error occured'
            })
        }
    }

export const fetchPayoutSetupInfo = async (dispatch, getState) => {
    const { payout } = getState()
    if (payout.loading) {
        return
    }

    try {
        dispatch({
            type: PAYOUT_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/payout/setup-intent`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        )
        const response = await request.json()

        if (request.status === 200) {
            dispatch({
                type: SET_PAYOUT_SETUP,
                payload: response
            })
        } else {
            dispatch({
                type: PAYOUT_ERROR,
                payload: response.message
            })
        }
    } catch (e) {
        dispatch({
            type: PAYOUT_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const clearPayoutSetup = (isDefault) => async (dispatch, getState) => {
    const { payout } = getState()
    if (payout.loading) {
        return
    }

    try {
        dispatch({
            type: PAYOUT_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/payout/setup-intent`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ isDefault })
            }
        )
        const response = await request.json()

        if (request.status === 200) {
            dispatch({
                type: CLEAR_PAYOUT_SETUP
            })
            dispatch({
                type: SET_PAYOUT_METHODS,
                payload: response.payoutMethods
            })
        } else {
            dispatch({
                type: PAYOUT_ERROR,
                payload: response.message
            })
        }
    } catch (e) {
        dispatch({
            type: PAYOUT_ERROR,
            payload: 'An unknown error occured'
        })
    }
}
