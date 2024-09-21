import React from 'react'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import Page from '@components/Page'
import { userLogout } from '@store'

const Settings = () => {
    const dispatch = useDispatch()

    const onLogoutPress = () => {
        dispatch(userLogout)
    }

    return (
        <Page>
            <Button mode="contained" onPress={onLogoutPress}>
                Logout
            </Button>
        </Page>
    )
}

export default Settings
