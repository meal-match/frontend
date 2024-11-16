import React, { useEffect } from 'react'
import { Text } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Divider from '@components/Divider'
import Page from '@components/Page'
import Button from '@components/Button'
import { getProfile, selectProfileData, selectIsLoggedIn } from '@store'
import { enGB, registerTranslation } from 'react-native-paper-dates'
registerTranslation('en-GB', enGB)

const Index = () => {
    const dispatch = useDispatch()

    const profileData = useSelector(selectProfileData)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getProfile)
        }
    })

    const name = profileData.firstName

    return (
        <Page header={name ? `Hello ${name}` : 'Hello'} style={styles.page}>
            <View style={styles.buttonContainer}>
                <Text style={styles.question}>Would you like to...</Text>
                <Button url="buy/" text="Buy" height="15%"></Button>
                <Divider width={'40%'} />
                <Button url="sell/" text="Sell" height="15%"></Button>
                <Divider />
                {/* if is ordered */}
                <Button url="/openOrders" text="Open Orders" height="15%" />
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
