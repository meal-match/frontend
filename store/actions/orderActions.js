import {
    SET_RESTAURANT,
    MEAL_ERROR,
    SET_ENTREE,
    SET_ENTREE_CUSTOMIZATIONS,
    SET_DRINK,
    SET_PICKUP_TIME,
    SET_SAUCE,
    SET_SIDE,
    SET_SIDE_CUSTOMIZATIONS,
    ORDER_MEAL
} from '@constants'

export const setRestaurant = (restaurant) => async (dispatch, getState) => {
    const { order } = getState()
    if (order.loading) {
        return
    }
    try {
        dispatch({
            type: SET_RESTAURANT,
            payload: restaurant
        })
    } catch (error) {
        dispatch({
            type: MEAL_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const setEntree = (entree) => async (dispatch, getState) => {
    const { order } = getState()
    if (order.loading) {
        return
    }
    try {
        dispatch({
            type: SET_ENTREE,
            payload: entree
        })
    } catch (error) {
        dispatch({
            type: MEAL_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const setEntreeCustomizations =
    (customizations) => async (dispatch, getState) => {
        const { order } = getState()
        if (order.loading) {
            return
        }
        try {
            dispatch({
                type: SET_ENTREE_CUSTOMIZATIONS,
                payload: customizations
            })
        } catch (error) {
            dispatch({
                type: MEAL_ERROR,
                payload: 'An unknown error occured'
            })
        }
    }

export const setSide = (side) => async (dispatch, getState) => {
    const { order } = getState()
    if (order.loading) {
        return
    }
    try {
        dispatch({
            type: SET_SIDE,
            payload: side
        })
    } catch (error) {
        dispatch({
            type: MEAL_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const setSideCustomizations =
    (customizations) => async (dispatch, getState) => {
        const { order } = getState()
        if (order.loading) {
            return
        }
        try {
            dispatch({
                type: SET_SIDE_CUSTOMIZATIONS,
                payload: customizations
            })
        } catch (error) {
            dispatch({
                type: MEAL_ERROR,
                payload: 'An unknown error occured'
            })
        }
    }

export const setDrink = (drink) => async (dispatch, getState) => {
    const { order } = getState()
    if (order.loading) {
        return
    }
    try {
        dispatch({
            type: SET_DRINK,
            payload: drink
        })
    } catch (error) {
        dispatch({
            type: MEAL_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const setSauce = (sauce) => async (dispatch, getState) => {
    const { order } = getState()
    if (order.loading) {
        return
    }
    try {
        dispatch({
            type: SET_SAUCE,
            payload: sauce
        })
    } catch (error) {
        dispatch({
            type: MEAL_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const setPickupTime = (time) => async (dispatch, getState) => {
    const { order } = getState()
    if (order.loading) {
        return
    }
    try {
        dispatch({
            type: SET_PICKUP_TIME,
            payload: time
        })
    } catch (error) {
        dispatch({
            type: MEAL_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const orderMeal = (meal) => async (dispatch, getState) => {
    const { order } = getState()
    if (order.loading) {
        return
    }
    try {
        dispatch({
            type: ORDER_MEAL,
            payload: meal
        })
    } catch (error) {
        dispatch({
            type: MEAL_ERROR,
            payload: 'An unknown error occured'
        })
    }
}
