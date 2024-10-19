import React from 'react'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import Ionicons from '@expo/vector-icons/Ionicons'

import Page from '@components/Page'
import { userLogout } from '@store'

const Settings = () => {
    const dispatch = useDispatch()

    const onLogoutPress = () => {
        dispatch(userLogout)
    }

    const logoutIcon = () => (
        <Ionicons name="log-out-outline" size={28} color="#FFFFFF" />
    )

    return (
        <Page>
            <Button
                mode="contained"
                onPress={onLogoutPress}
                icon={logoutIcon}
                contentStyle={{ flexDirection: 'row-reverse' }}
            >
                Logout
            </Button>
        </Page>
    )
}

export default Settings
