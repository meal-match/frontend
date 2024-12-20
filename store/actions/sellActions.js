import {
    CLAIM_ORDER,
    CLAIM_ORDER_LOADING,
    CLAIM_ORDER_ERROR,
    ORDERS_LOADING,
    ORDERS_INITIAL_LOADING,
    SET_ORDERS,
    GET_ORDERS_ERROR,
    UNCLAIM_ORDER,
    CONFIRM_ORDER
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
            process.env.EXPO_PUBLIC_API_URL + '/orders',
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
            process.env.EXPO_PUBLIC_API_URL + '/orders/' + order._id + '/claim',
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
            process.env.EXPO_PUBLIC_API_URL +
                '/orders/' +
                sell.claimedOrder._id +
                '/unclaim',
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

export const confirmOrder = (order) => async (dispatch, getState) => {
    const { sell } = getState()
    if (sell.claimedOrderLoading || !sell.claimedOrder) {
        return
    }

    try {
        dispatch({
            type: CLAIM_ORDER_LOADING
        })
        // TODO: Add this route in when backend is caught up
        // const request = await fetch(
        //     process.env.EXPO_PUBLIC_API_URL +
        //         '/orders/' +
        //         sell.claimedOrder._id +
        //         '/confirm',
        //     {
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         credentials: 'include'
        //     }
        // )
        // const response = await request.json()

        // if (request.status === 200) {
        //     dispatch({
        //         type: CONFIRM_ORDER,
        //         payload: order
        //     })
        // } else {
        //     dispatch({
        //         type: CLAIM_ORDER_ERROR,
        //         payload: response.message
        //     })
        // }

        // TODO: delete this and use above code when backend is caught up
        dispatch({
            type: CONFIRM_ORDER,
            payload: order
        })
    } catch (error) {
        dispatch({
            type: CLAIM_ORDER_ERROR,
            payload: 'An unknown error occured'
        })
    }
}
