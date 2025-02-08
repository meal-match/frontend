import { useNavigation } from 'expo-router'
import { string } from 'prop-types'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

import Page from '@components/Page'
import { clearRouterStack } from '@utils'

const PaymentSetupRedirect = ({ type }) => {
    const navigation = useNavigation()

    const payType = type === 'buy' ? 'payment' : 'payout'

    return (
        <Page header="Information Required">
            <View style={styles.content}>
                <Text style={styles.text}>
                    Before you can {type} meals, you must finish setting up your{' '}
                    {payType} information.
                </Text>
                <Button
                    mode="contained"
                    onPress={() =>
                        clearRouterStack(
                            `/settings/${payType}Setup`,
                            navigation
                        )
                    }
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

PaymentSetupRedirect.propTypes = {
    type: string.isRequired
}

export default PaymentSetupRedirect
