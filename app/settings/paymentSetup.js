import Ionicons from '@expo/vector-icons/Ionicons'
import { StripeProvider, useStripe } from '@stripe/stripe-react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import { Button, HelperText, Text } from 'react-native-paper'
import { PaymentIcon } from 'react-native-payment-icons'
import { useDispatch, useSelector } from 'react-redux'

import Divider from '@components/Divider'
import LoadingSpinner from '@components/LoadingSpinner'
import Page from '@components/Page'
import {
    clearPaymentSetup,
    deletePaymentMethod,
    fetchPaymentMethods,
    fetchPaymentSetupInfo,
    selectPaymentError,
    selectPaymentLoading,
    selectPaymentMethods,
    selectPaymentSetup,
    setDefaultPaymentMethod
} from '@store'

const PaymentSetup = () => {
    const dispatch = useDispatch()
    const { initPaymentSheet, presentPaymentSheet } = useStripe()

    const [hasError, setHasError] = useState(false)
    const [shouldOpen, setShouldOpen] = useState(false)

    const paymentLoading = useSelector(selectPaymentLoading)
    const paymentError = useSelector(selectPaymentError)
    const paymentMethods = useSelector(selectPaymentMethods)
    const paymentSetup = useSelector(selectPaymentSetup)

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
        } else if (shouldOpen) {
            setShouldOpen(false)
            openPaymentSheet()
        }
    }

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet()

        if (error) {
            Alert.alert(`Error: ${error.code}`, error.message)
        } else {
            dispatch(clearPaymentSetup(false))
        }
    }

    useEffect(() => {
        dispatch(fetchPaymentMethods)
    }, [])

    useEffect(() => {
        if (Object.keys(paymentSetup).length) {
            initializePaymentSheet(paymentSetup)
        }
    }, [paymentSetup])

    if (paymentLoading) {
        return <LoadingSpinner />
    }

    const paymentMethodTable = paymentMethods.length ? (
        <ScrollView
            style={styles.paymentMethodTable}
            contentContainerStyle={styles.scrollContent}
        >
            {paymentMethods.map((method) => (
                <Fragment key={method.id}>
                    <View style={styles.paymentMethodRow}>
                        <PaymentIcon type={method.card.brand} />
                        <View>
                            <Text>**** **** **** {method.card.last4}</Text>
                            <Text>
                                Expires: {method.card.exp_month}/
                                {method.card.exp_year}
                            </Text>
                        </View>
                        {method.default ? (
                            <Text style={styles.defaultMethodText}>
                                Default Method
                            </Text>
                        ) : (
                            <Button
                                mode="text"
                                onPress={() =>
                                    dispatch(setDefaultPaymentMethod(method.id))
                                }
                            >
                                Make Default
                            </Button>
                        )}
                        <Button
                            mode="text"
                            onPress={() =>
                                dispatch(deletePaymentMethod(method.id))
                            }
                        >
                            <Ionicons name="trash-outline" size={20} />
                        </Button>
                    </View>
                    <Divider />
                </Fragment>
            ))}
        </ScrollView>
    ) : null

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
                    order to be able to buy meals, you must set up a payment
                    method for future payments.
                </Text>
                <Divider />
                {paymentMethodTable}
                <Button
                    mode="contained"
                    onPress={() => {
                        if (Object.keys(paymentSetup).length) {
                            openPaymentSheet()
                        } else {
                            setShouldOpen(true)
                            dispatch(fetchPaymentSetupInfo)
                        }
                    }}
                    style={styles.addMethodButton}
                >
                    Add Method
                </Button>
                {(paymentError || hasError) && (
                    <HelperText type="error" visible={paymentError || hasError}>
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
        marginBottom: 10,
        textAlign: 'center'
    },
    paymentMethodRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    paymentMethodTable: {
        marginTop: 10,
        flexGrow: 0
    },
    addMethodButton: {
        marginTop: 10,
        marginBottom: 10
    },
    defaultMethodText: {
        fontWeight: 'bold'
    },
    scrollContent: {
        display: 'flex',
        gap: 10
    }
})

export default PaymentSetup
