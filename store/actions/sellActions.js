import {
    CLAIM_ORDER,
    CLAIM_ORDER_ERROR,
    CLAIM_ORDER_LOADING,
    CONFIRM_ORDER,
    GET_ORDERS_ERROR,
    ORDERS_INITIAL_LOADING,
    ORDERS_LOADING,
    SET_ORDERS,
    UNCLAIM_ORDER,
    SET_WAIT_TIME,
    SET_RECEIPT_URI,
    UNCONFIRM_ORDER
} from '@constants'

export const getOrders = async (dispatch, getState) => {
    const { sell } = getState()
    if (sell.ordersLoading) {
        return
    }

    try {
        dispatch({
            type:
                sell.ordersInitialLoading === null
                    ? ORDERS_INITIAL_LOADING
                    : ORDERS_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/orders`,
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
                type: SET_ORDERS,
                payload: response.orders
            })
        } else {
            dispatch({
                type: GET_ORDERS_ERROR,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: GET_ORDERS_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const claimOrder = (order) => async (dispatch, getState) => {
    const { sell } = getState()
    if (sell.claimedOrderLoading) {
        return
    }

    try {
        dispatch({
            type: CLAIM_ORDER_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/orders/${order._id}/claim`,
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
                type: CLAIM_ORDER,
                payload: order
            })
        } else {
            dispatch({
                type: CLAIM_ORDER_ERROR,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: CLAIM_ORDER_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const resetClaimOrderError = (dispatch) => {
    dispatch({
        type: CLAIM_ORDER_ERROR,
        payload: null
    })
}

export const unclaimOrder = async (dispatch, getState) => {
    const { sell } = getState()
    if (sell.claimedOrderLoading || !sell.claimedOrder) {
        return
    }

    try {
        dispatch({
            type: CLAIM_ORDER_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/orders/${sell.claimedOrder._id}/unclaim`,
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
                type: UNCLAIM_ORDER
            })
        } else {
            dispatch({
                type: CLAIM_ORDER_ERROR,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: CLAIM_ORDER_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const confirmOrder = async (dispatch, getState) => {
    const { sell } = getState()
    if (sell.claimedOrderLoading || !sell.claimedOrder) {
        return
    }
    const time = new Date()
    time.setMinutes(time.getMinutes() + sell.claimedOrder.waitTime)

    const formData = new FormData()
    formData.append(
        'readyTime',
        time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    )
    formData.append('receipt', {
        uri: sell.claimedOrder.receiptUri,
        name: 'receipt.png',
        type: 'image/png'
    })

    try {
        dispatch({
            type: CLAIM_ORDER_LOADING
        })
        const request = await fetch(
            process.env.EXPO_PUBLIC_API_URL +
                '/orders/' +
                sell.claimedOrder._id +
                '/confirm',
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formData,
                credentials: 'include'
            }
        )
        const response = await request.json()

        if (request.status === 200) {
            dispatch({
                type: CONFIRM_ORDER,
                payload: sell.claimedOrder
            })
        } else {
            dispatch({
                type: CLAIM_ORDER_ERROR,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: CLAIM_ORDER_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const setWaitTime = (waitTime) => async (dispatch) => {
    dispatch({
        type: SET_WAIT_TIME,
        payload: waitTime
    })
}

export const setReceiptUri = (uri) => async (dispatch) => {
    dispatch({
        type: SET_RECEIPT_URI,
        payload: uri
    })
}

export const unconfirmOrder = async (dispatch) => {
    await dispatch({
        type: UNCONFIRM_ORDER,
        payload: null
    })
}
