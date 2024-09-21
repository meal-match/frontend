import {
    SET_ENTREE,
    SET_SIDE,
    SET_DRINK,
    SET_SAUCE,
    ORDER_MEAL,
    MEAL_ERROR
} from '@constants'

export const setEntree = (entree) => async (dispatch, getState) => {
    const { meal } = getState()
    if (meal.loading) {
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

export const setSide = (side) => async (dispatch, getState) => {
    const { meal } = getState()
    if (meal.loading) {
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

export const setDrink = (drink) => async (dispatch, getState) => {
    const { meal } = getState()
    if (meal.loading) {
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
    const { meal } = getState()
    if (meal.loading) {
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

export const orderMeal = (order) => async (getState, dispatch) => {
    const { meal } = getState()
    if (meal.loading) {
        return
    }
    try {
        dispatch({
            type: ORDER_MEAL,
            payload: order
        })
    } catch (error) {
        dispatch({
            type: MEAL_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const getMeal = async (getState) => {
    const { meal } = getState()
    if (meal.loading || Object.keys(meal.mealData).length !== 0) {
        return
    }
}
