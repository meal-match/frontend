import React, { useEffect } from 'react'
import { Text } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Page from '@components/Page'
import Button from '@components/Button'
import { getProfile, selectProfileData, selectIsLoggedIn } from '@store'

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
        <Page header={`Hello ${name}`} style={styles.page}>
            <View style={styles.buttonContainer}>
                <Text style={styles.question}>Would you like to...</Text>
                <Button url="buy/" text="Buy" height="15%"></Button>
                <View style={[styles.divider]} />
                <Button url="sell/" text="Sell" height="15%"></Button>
                <View style={[styles.divider, { width: '100%' }]}></View>
                {/* if is ordered */}
                <Button
                    url="/openOrders"
                    text="Open Orders"
                    height="15%"
                ></Button>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        gap: 16,
        marginTop: '8%'
    },
    page: {
        headerTitleAlign: 'left',
        flex: 1
    },
    divider: {
        width: '40%', // Divider spans full width of the screen
        height: 1, // Thin divider
        backgroundColor: '#B3B3B3', // Light gray color for the divider
        marginVertical: 15 // Spacing between links and dividers
    },
    question: {
        fontSize: 24,
        marginBottom: '3%',
        color: '#000000',
        fontStyle: 'italic',
        fontWeight: '700'
    }
})

export default Index
