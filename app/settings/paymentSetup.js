import { StripeProvider, useStripe } from '@stripe/stripe-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { Button, HelperText, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import LoadingSpinner from '@components/LoadingSpinner'
import Page from '@components/Page'
import {
    initPaymentSetup,
    savePaymentMethod,
    selectPaymentLoading,
    selectPaymentMethodSaved,
    selectPaymentSetup,
    selectPaymentSetupError,
    selectProfileData
} from '@store'

const PaymentSetup = () => {
    const dispatch = useDispatch()
    const { initPaymentSheet, presentPaymentSheet } = useStripe()

    const [hasError, setHasError] = useState(false)
    const [hasLoaded, setHasLoaded] = useState(false)

    const profileData = useSelector(selectProfileData)
    const paymentSetupIntent = profileData?.paymentSetupIntent

    const paymentLoading = useSelector(selectPaymentLoading)
    const paymentSetup = useSelector(selectPaymentSetup)
    const paymentSetupError = useSelector(selectPaymentSetupError)
    const paymentMethodSaved = useSelector(selectPaymentMethodSaved)

    const initializePaymentSheet = async (paymentSetup) => {
        const { paymentSetupIntent, ephemeralKey, customer } = paymentSetup

        // TODO: add a returnURL
        const { error } = await initPaymentSheet({
            merchantDisplayName: 'MealMatch',
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            setupIntentClientSecret: paymentSetupIntent
        })
        if (error) {
            setHasError(true)
        } else {
            setHasLoaded(true)
        }
    }

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet()

        if (error) {
            Alert.alert(`Error: ${error.code}`, error.message)
        } else {
            dispatch(savePaymentMethod)
        }
    }

    useEffect(() => {
        dispatch(initPaymentSetup)
    }, [])

    useEffect(() => {
        if (Object.keys(paymentSetup).length) {
            initializePaymentSheet(paymentSetup)
        }
    }, [paymentSetup])

    if (paymentLoading) {
        return <LoadingSpinner />
    }

    if (!paymentSetupIntent) {
        return (
            <Page header="Payment Setup" style={styles.page}>
                <Text style={styles.text}>
                    We do not currently allow changing saved payment methods.
                </Text>
            </Page>
        )
    }

    if (paymentMethodSaved === true) {
        return (
            <Page header="Payment Setup" style={styles.page}>
                <Text style={styles.text}>
                    Your payment method is successfully set up for future
                    payments!
                </Text>
            </Page>
        )
    }

    if (paymentMethodSaved === false) {
        return (
            <Page header="Payment Setup" style={styles.page}>
                <Text style={styles.text}>
                    An error has occured while saving your payment method.
                    Please try again later.
                </Text>
            </Page>
        )
    }

    return (
        // TODO: fiill in with real merchantIdentifier and urlScheme
        <StripeProvider
            publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}
            merchantIdentifier="merchant.identifier"
            urlScheme="your.url.scheme"
        >
            <Page header="Payment Setup" style={styles.page}>
                <Text style={styles.text}>
                    We use Stripe to securely store your payment information. In
                    order to have access to our services, you must set up a
                    payment method for future payments.
                </Text>
                <Button
                    mode="contained"
                    disabled={!hasLoaded}
                    onPress={openPaymentSheet}
                >
                    Set Up
                </Button>
                {(paymentSetupError || hasError) && (
                    <HelperText
                        type="error"
                        visible={paymentSetupError || hasError}
                    >
                        An internal error has occured. Please try again later.
                    </HelperText>
                )}
            </Page>
        </StripeProvider>
    )
}

const styles = StyleSheet.create({
    page: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    }
})

export default PaymentSetup
