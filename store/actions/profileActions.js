import { PROFILE_LOADING, GET_PROFILE, PROFILE_ERROR } from '@constants'

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
            process.env.EXPO_PUBLIC_API_URL + '/profile',
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
                type: GET_PROFILE,
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
