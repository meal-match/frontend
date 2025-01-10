import {
    CLEAR_PAYMENT_SETUP,
    PAYMENT_ERROR,
    PAYMENT_LOADING,
    SET_PAYMENT_METHODS,
    SET_PAYMENT_SETUP
} from '@constants'

export const fetchPaymentMethods = async (dispatch, getState) => {
    const { payment } = getState()
    if (payment.loading || payment.methods.length) {
        return
    }

    try {
        dispatch({
            type: PAYMENT_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/payment/customer`,
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
                type: SET_PAYMENT_METHODS,
                payload: response.paymentMethods
            })
        } else {
            dispatch({
                type: PAYMENT_ERROR,
                payload: response.message
            })
        }
    } catch (e) {
        dispatch({
            type: PAYMENT_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const setDefaultPaymentMethod =
    (paymentMethodID) => async (dispatch, getState) => {
        const { payment } = getState()
        if (payment.loading) {
            return
        }

        try {
            dispatch({
                type: PAYMENT_LOADING
            })

            const request = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/payment/default-method/${paymentMethodID}`,
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
                    type: SET_PAYMENT_METHODS,
                    payload: response.paymentMethods
                })
            } else {
                dispatch({
                    type: PAYMENT_ERROR,
                    payload: response.message
                })
            }
        } catch (e) {
            dispatch({
                type: PAYMENT_ERROR,
                payload: 'An unknown error occured'
            })
        }
    }

export const deletePaymentMethod =
    (paymentMethodID) => async (dispatch, getState) => {
        const { payment } = getState()
        if (payment.loading) {
            return
        }

        try {
            dispatch({
                type: PAYMENT_LOADING
            })

            const request = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/payment/${paymentMethodID}`,
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
                    type: SET_PAYMENT_METHODS,
                    payload: response.paymentMethods
                })
            } else {
                dispatch({
                    type: PAYMENT_ERROR,
                    payload: response.message
                })
            }
        } catch (e) {
            dispatch({
                type: PAYMENT_ERROR,
                payload: 'An unknown error occured'
            })
        }
    }

export const fetchPaymentSetupInfo = async (dispatch, getState) => {
    const { payment } = getState()
    if (payment.loading) {
        return
    }

    try {
        dispatch({
            type: PAYMENT_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/payment/setup-intent`,
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
                type: SET_PAYMENT_SETUP,
                payload: response
            })
        } else {
            dispatch({
                type: PAYMENT_ERROR,
                payload: response.message
            })
        }
    } catch (e) {
        dispatch({
            type: PAYMENT_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const clearPaymentSetup = (isDefault) => async (dispatch, getState) => {
    const { payment } = getState()
    if (payment.loading) {
        return
    }

    try {
        dispatch({
            type: PAYMENT_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/payment/setup-intent`,
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
                type: CLEAR_PAYMENT_SETUP
            })
            dispatch({
                type: SET_PAYMENT_METHODS,
                payload: response.paymentMethods
            })
        } else {
            dispatch({
                type: PAYMENT_ERROR,
                payload: response.message
            })
        }
    } catch (e) {
        dispatch({
            type: PAYMENT_ERROR,
            payload: 'An unknown error occured'
        })
    }
}
