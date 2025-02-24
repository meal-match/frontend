import {
    OPEN_ORDERS_ERROR,
    OPEN_ORDERS_LOADING,
    SET_ACTIVE_OPEN_ORDER,
    SET_OPEN_ORDERS
} from '@constants'

export const getOpenOrders = async (dispatch, getState) => {
    const { openOrders } = getState()
    if (openOrders.loading) {
        return
    }

    try {
        dispatch({
            type: OPEN_ORDERS_LOADING
        })
        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/orders/open`,
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
                type: SET_OPEN_ORDERS,
                payload: response.orders
            })
        } else {
            dispatch({
                type: OPEN_ORDERS_ERROR,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: OPEN_ORDERS_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const setActiveOpenOrder = (order) => async (dispatch) => {
    dispatch({
        type: SET_ACTIVE_OPEN_ORDER,
        payload: order
    })
}

export const cancelOrderBuy = async (dispatch, getState) => {
    const { openOrders } = getState()
    if (openOrders.openOrdersLoading || !openOrders.activeOpenOrder) {
        return
    }

    try {
        dispatch({
            type: OPEN_ORDERS_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/orders/${openOrders.activeOpenOrder._id}/cancel-buy`,
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
                type: SET_ACTIVE_OPEN_ORDER,
                payload: null
            })
            dispatch(getOpenOrders)
        } else {
            dispatch({
                type: OPEN_ORDERS_ERROR,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: OPEN_ORDERS_ERROR,
            payload: 'An unknown error occured'
        })
    }
}
