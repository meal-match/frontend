import {
    DELETE_PROFILE_ERROR,
    PROFILE_ERROR,
    PROFILE_LOADING,
    SET_PROFILE,
    USER_LOGOUT,
    SET_SELECTED_ORDER
} from '@constants'

export const getProfile = async (dispatch, getState) => {
    const { profile } = getState()
    if (
        profile.profileLoading ||
        Object.keys(profile.profileData).length !== 0
    ) {
        return
    }

    try {
        dispatch({
            type: PROFILE_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/profile`,
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
                type: SET_PROFILE,
                payload: response
            })
        } else {
            dispatch({
                type: PROFILE_ERROR,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const deleteProfile = async (dispatch, getState) => {
    const { profile } = getState()
    if (profile.profileLoading) {
        return
    }

    try {
        dispatch({
            type: PROFILE_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/profile`,
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
                type: USER_LOGOUT
            })
        } else {
            dispatch({
                type: DELETE_PROFILE_ERROR,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: DELETE_PROFILE_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const setSelectedOrder = (order) => (dispatch) => {
    dispatch({
        type: SET_SELECTED_ORDER,
        payload: order
    })
}
