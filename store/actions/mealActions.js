import {
    SET_ENTREE,
    SET_SIDE,
    SET_DRINK,
    SET_SAUCE,
    ORDER_MEAL,
    MEAL_ERROR,
    SET_MEAL_DATA
} from '@constants'
import { MEAL_LOADING } from '../../constants/actions'

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

export const orderMeal = (order) => async (dispatch, getState) => {
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

export const getMealOptions = async (dispatch, getState) => {
    const { meal } = getState()
    if (meal.loading || Object.keys(meal.mealData).length === 0) {
        return
    }

    try {
        dispatch({
            type: MEAL_LOADING
        })
        const request = await fetch(
            process.env.EXPO_PUBLIC_API_URL + '/meals',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
        )
        const response = await request.json()

        if (response.status === 200) {
            dispatch({
                type: SET_MEAL_DATA,
                payload: response
            })
        } else {
            dispatch({
                type: MEAL_ERROR,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: MEAL_ERROR,
            payload: 'An unknown error occured'
        })
    }
}
