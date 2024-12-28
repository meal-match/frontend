import {
    SET_RESTAURANT,
    ORDER_ERROR,
    SET_ENTREE,
    SET_ENTREE_CUSTOMIZATIONS,
    SET_DRINK,
    SET_PICKUP_TIME,
    SET_SAUCE,
    SET_SIDE,
    SET_SIDE_CUSTOMIZATIONS,
    ORDER_PLACED,
    ORDER_LOADING,
    ORDER_CANCELLED,
    CLEAR_ORDER
} from '@constants'

export const setRestaurant = (restaurant) => (dispatch, getState) => {
    const { order } = getState()
    if (order.orderLoading) {
        return
    }
    try {
        dispatch({
            type: SET_RESTAURANT,
            payload: restaurant
        })
    } catch (error) {
        dispatch({
            type: ORDER_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const setEntree = (entree) => (dispatch, getState) => {
    const { order } = getState()
    if (order.orderLoading) {
        return
    }
    try {
        dispatch({
            type: SET_ENTREE,
            payload: entree
        })
    } catch (error) {
        dispatch({
            type: ORDER_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const setEntreeCustomizations =
    (customizations) => (dispatch, getState) => {
        const { order } = getState()
        if (order.orderLoading) {
            return
        }
        try {
            dispatch({
                type: SET_ENTREE_CUSTOMIZATIONS,
                payload: customizations
            })
        } catch (error) {
            dispatch({
                type: ORDER_ERROR,
                payload: 'An unknown error occured'
            })
        }
    }

export const setSide = (side) => (dispatch, getState) => {
    const { order } = getState()
    if (order.orderLoading) {
        return
    }
    try {
        dispatch({
            type: SET_SIDE,
            payload: side
        })
    } catch (error) {
        dispatch({
            type: ORDER_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const setSideCustomizations =
    (customizations) => (dispatch, getState) => {
        const { order } = getState()
        if (order.orderLoading) {
            return
        }
        try {
            dispatch({
                type: SET_SIDE_CUSTOMIZATIONS,
                payload: customizations
            })
        } catch (error) {
            dispatch({
                type: ORDER_ERROR,
                payload: 'An unknown error occured'
            })
        }
    }

export const setDrink = (drink) => (dispatch, getState) => {
    const { order } = getState()
    if (order.orderLoading) {
        return
    }
    try {
        dispatch({
            type: SET_DRINK,
            payload: drink
        })
    } catch (error) {
        dispatch({
            type: ORDER_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const setSauce = (sauce) => (dispatch, getState) => {
    const { order } = getState()
    if (order.orderLoading) {
        return
    }
    try {
        dispatch({
            type: SET_SAUCE,
            payload: sauce
        })
    } catch (error) {
        dispatch({
            type: ORDER_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const setPickupTime = (time) => (dispatch, getState) => {
    const { order } = getState()
    if (order.orderLoading) {
        return
    }
    try {
        dispatch({
            type: SET_PICKUP_TIME,
            payload: time
        })
    } catch (error) {
        dispatch({
            type: ORDER_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const placeOrder = async (dispatch, getState) => {
    const { order } = getState()
    if (order.orderLoading) {
        return
    }

    try {
        dispatch({
            type: ORDER_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/orders/buy`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    entree: order.entree,
                    entreeCustomizations: order.entreeCustomizations,
                    side: order.side,
                    sideCustomizations: order.sideCustomizations,
                    drink: order.drink,
                    drinkCustomizations: order.drinkCustomizations,
                    sauces: order.sauce,
                    pickupTime: order.pickupTime,
                    restaurant: order.restaurant
                })
            }
        )
        const response = await request.json()

        if (request.status === 201) {
            dispatch({
                type: ORDER_PLACED,
                payload: response.orderID
            })
        } else {
            dispatch({
                type: ORDER_ERROR,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: ORDER_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const cancelOrder = async (dispatch, getState) => {
    const { order } = getState()
    if (order.orderLoading || !order.orderID) {
        return
    }

    try {
        dispatch({
            type: ORDER_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/orders/${order.orderID}/cancel-buy`,
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
                type: ORDER_CANCELLED
            })
        } else {
            dispatch({
                type: ORDER_ERROR,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: ORDER_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const clearOrder = async (dispatch, getState) => {
    const { order } = getState()
    if (order.orderLoading) {
        return
    }
    try {
        dispatch({
            type: CLEAR_ORDER
        })
    } catch (error) {
        dispatch({
            type: ORDER_ERROR,
            payload: 'An unknown error occured'
        })
    }
}
