import {
    PAYMENT_LOADING,
    PAYMENT_SETUP,
    PAYMENT_SETUP_ERROR,
    PAYMENT_METHOD_SAVED
} from '@constants'

export const initPaymentSetup = async (dispatch, getState) => {
    const { payment } = getState()
    if (payment.paymentLoading) {
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

        if (request.status === 200) {
            const data = await request.json()
            dispatch({
                type: PAYMENT_SETUP,
                payload: data
            })
        } else {
            dispatch({
                type: PAYMENT_SETUP_ERROR
            })
        }
    } catch (e) {
        dispatch({
            type: PAYMENT_SETUP_ERROR
        })
    }
}

export const savePaymentMethod = async (dispatch, getState) => {
    const { payment } = getState()
    if (payment.paymentLoading) {
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
                credentials: 'include'
            }
        )

        if (request.status === 200) {
            dispatch({
                type: PAYMENT_METHOD_SAVED,
                payload: true
            })
        } else {
            dispatch({
                type: PAYMENT_METHOD_SAVED,
                payload: false
            })
        }
    } catch (e) {
        dispatch({
            type: PAYMENT_METHOD_SAVED,
            payload: false
        })
    }
}
