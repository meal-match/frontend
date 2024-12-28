import React from 'react'
import { Button } from 'react-native-paper'
import { useNavigation } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

import Page from '@components/Page'
import { clearRouterStack } from '@utils'

const PaymentSetupRedirect = () => {
    const navigation = useNavigation()

    return (
        <Page header="Information Required">
            <View style={styles.content}>
                <Text style={styles.text}>
                    Before you can buy or sell meals, you must finish setting up
                    your payment information.
                </Text>
                <Button
                    mode="contained"
                    onPress={() => clearRouterStack('/settings', navigation)}
                >
                    Go to Settings
                </Button>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    content: {
        padding: 10
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    }
})

export default PaymentSetupRedirect
