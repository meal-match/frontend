import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@components/Button'
import Divider from '@components/Divider'
import Page from '@components/Page'
import {
    fetchPaymentMethods,
    fetchPayoutAccountSetupStatus,
    getProfile,
    selectIsLoggedIn,
    selectProfileData,
    selectPushToken,
    setPushToken
} from '@store'
import { registerForPushNotificationsAsync } from '@utils'

const Index = () => {
    const dispatch = useDispatch()

    const profileData = useSelector(selectProfileData)
    const pushToken = useSelector(selectPushToken)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchPaymentMethods)
            dispatch(getProfile)
            dispatch(fetchPayoutAccountSetupStatus)

            if (!pushToken) {
                registerForPushNotificationsAsync()
                    .then((token) => {
                        if (token) {
                            dispatch(setPushToken(token))
                        }
                    })
                    .catch(() => {})
            }
        }
    }, [])

    const name = profileData.firstName

    return (
        <Page header={name ? `Hello, ${name}!` : 'Hello!'} style={styles.page}>
            <View style={styles.buttonContainer}>
                <Text style={styles.question}>Would you like to...</Text>
                <Button url="buy/" text="Buy" height={'20%'} />
                <Divider width={'40%'} />
                <Button url="sell/" text="Sell" height={'20%'} />
                <Divider />
                <Button url="/openOrders" text="Open Orders" height={'20%'} />
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        gap: 24,
        marginTop: '8%'
    },
    page: {
        flex: 1
    },
    question: {
        fontSize: 24,
        color: '#000000',
        fontStyle: 'italic',
        fontWeight: '700'
    }
})

export default Index
