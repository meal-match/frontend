import {
    MEAL_ERROR,
    SET_MEAL_DATA,
    SET_RESTAURANT_DATA,
    MEAL_LOADING
} from '@constants'

export const getMeal = async (getState) => {
    const { restaurant } = getState()
    if (restaurant.loading || Object.keys(restaurant.mealData).length !== 0) {
        return
    }
}

export const getMealOptions = async (dispatch, getState) => {
    const { restaurant } = getState()
    if (restaurant.loading || Object.keys(restaurant.mealData).length !== 0) {
        return
    }

    try {
        dispatch({
            type: MEAL_LOADING
        })

        const request = await fetch(
            process.env.EXPO_PUBLIC_API_URL + '/restaurants',
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

export const setRestaurantData =
    (restaurantData) => async (dispatch, getState) => {
        const { restaurant } = getState()
        if (restaurant.loading) {
            return
        }
        try {
            dispatch({
                type: SET_RESTAURANT_DATA,
                payload: restaurantData
            })
        } catch (error) {
            dispatch({
                type: MEAL_ERROR,
                payload: 'An unknown error occured'
            })
        }
    }
