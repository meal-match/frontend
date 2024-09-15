import React, { useEffect } from 'react'
import { Button, Text } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import Page from '@components/Page'
import {
    getProfile,
    selectFirstName,
    selectLastName,
    selectIsLoggedIn
} from '@store'

const Index = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const firstName = useSelector(selectFirstName)
    const lastName = useSelector(selectLastName)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const onBuyPress = () => {
        router.push('buy/')
    }
    const onSellPress = () => {
        router.push('sell/')
    }

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getProfile)
        }
    })

    const name = firstName && lastName && `Hello ${firstName} ${lastName}. `

    return (
        <Page>
            <View style={styles.buttonContainer}>
                <Text>{name}Would you like to...</Text>
                <Button mode="contained" onPress={onBuyPress}>
                    Buy
                </Button>
                <Button mode="contained" onPress={onSellPress}>
                    Sell
                </Button>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
    }
})

export default Index
