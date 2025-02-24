import {
    PAYOUT_ERROR,
    PAYOUT_LOADING,
    SET_PAYOUT_ACCOUNT,
    SET_PAYOUT_ACCOUNT_SETUP_LINK,
    SET_PAYOUT_ACCOUNT_SETUP_STATUS
} from '@constants'

export const createPayoutAccount = async (dispatch, getState) => {
    const { payout } = getState()
    if (payout.loading || payout.account) {
        return
    }

    try {
        dispatch({
            type: PAYOUT_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/payout/account`,
            {
                method: 'POST',
                credentials: 'include'
            }
        )

        if (request.status === 200 || request.status === 201) {
            const response = await request.json()
            dispatch({
                type: SET_PAYOUT_ACCOUNT,
                payload: response
            })
        } else {
            const response = await request.json()
            dispatch({
                type: PAYOUT_ERROR,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: PAYOUT_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const createPayoutAccountSetupLink = async (dispatch, getState) => {
    const { payout } = getState()
    if (payout.loading) {
        return
    }

    try {
        dispatch({
            type: PAYOUT_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/payout/account-link`,
            {
                method: 'POST',
                credentials: 'include'
            }
        )

        if (request.status === 201) {
            const response = await request.json()
            dispatch({
                type: SET_PAYOUT_ACCOUNT_SETUP_LINK,
                payload: response.accountLink
            })
            dispatch({
                type: SET_PAYOUT_ACCOUNT_SETUP_STATUS,
                payload: response.setupIsComplete
            })
        } else {
            const response = await request.json()
            dispatch({
                type: PAYOUT_ERROR,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: PAYOUT_ERROR,
            payload: 'An unknown error occured'
        })
    }
}

export const fetchPayoutAccountSetupStatus = async (dispatch, getState) => {
    const { payout } = getState()
    if (payout.loading || payout.setupIsComplete) {
        return
    }

    try {
        dispatch({
            type: PAYOUT_LOADING
        })

        const request = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/payout/account-status`,
            {
                method: 'GET',
                credentials: 'include'
            }
        )

        if (request.status === 200) {
            const response = await request.json()
            dispatch({
                type: SET_PAYOUT_ACCOUNT_SETUP_STATUS,
                payload: response.setupIsComplete
            })
        } else {
            const response = await request.json()
            dispatch({
                type: PAYOUT_ERROR,
                payload: response.message
            })
        }
    } catch (error) {
        dispatch({
            type: PAYOUT_ERROR,
            payload: 'An unknown error occured'
        })
    }
}
