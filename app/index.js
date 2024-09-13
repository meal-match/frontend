import React from 'react'
import { Button, Text } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'

import Page from '@components/Page'

const Index = () => {
    const router = useRouter()

    const onBuyPress = () => {
        router.replace('buy/')
    }
    const onSellPress = () => {
        router.replace('sell/')
    }

    return (
        <Page>
            <View style={styles.buttonContainer}>
                <Text>Would you like to...</Text>
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
        gap: '1rem'
    }
})

export default Index
