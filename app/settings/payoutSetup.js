import Ionicons from '@expo/vector-icons/Ionicons'
import { StripeProvider, useStripe } from '@stripe/stripe-react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import { Button, HelperText, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import Divider from '@components/Divider'
import LoadingSpinner from '@components/LoadingSpinner'
import Page from '@components/Page'
import {
    clearPayoutSetup,
    deletePayoutMethod,
    fetchPaymentMethods,
    fetchPayoutSetupInfo,
    selectPaymentLoading,
    selectPayoutError,
    selectPayoutLoading,
    selectPayoutMethods,
    selectPayoutSetup,
    selectProfileData,
    setDefaultPayoutMethod
} from '@store'

const PayoutSetup = () => {
    const dispatch = useDispatch()
    const { collectBankAccountForSetup, confirmSetupIntent } = useStripe()

    const [hasError, setHasError] = useState(false)
    const [shouldOpen, setShouldOpen] = useState(false)

    const paymentLoading = useSelector(selectPaymentLoading)
    const payoutLoading = useSelector(selectPayoutLoading)
    const payoutError = useSelector(selectPayoutError)
    const payoutSetup = useSelector(selectPayoutSetup)
    const payoutMethods = useSelector(selectPayoutMethods)
    const profileData = useSelector(selectProfileData)

    const showPayoutSetupSheet = async (payoutSetup) => {
        const { payoutSetupIntent } = payoutSetup

        // TODO: add a returnURL
        const { error, setupIntent } = await collectBankAccountForSetup(
            payoutSetupIntent,
            {
                paymentMethodType: 'USBankAccount',
                paymentMethodData: {
                    billingDetails: {
                        name: `${profileData.firstName} ${profileData.lastName}`,
                        email: profileData.email
                    }
                }
            }
        )

        setShouldOpen(false)

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message)
            if (error.code.toLowerCase() !== 'canceled') {
                setHasError(true)
            }
        } else if (setupIntent) {
            await showConfirmationSheet(payoutSetupIntent)
        }
    }

    const showConfirmationSheet = async (payoutSetupIntent) => {
        const { error, setupIntent } = await confirmSetupIntent(
            payoutSetupIntent,
            {
                paymentMethodType: 'USBankAccount'
            }
        )

        if (error) {
            setHasError(true)
            Alert.alert(`Error code: ${error.code}`, error.message)
        } else if (setupIntent) {
            const status = setupIntent.status.toLowerCase()
            if (status === 'processing' || status === 'succeeded') {
                dispatch(clearPayoutSetup(false))
                Alert.alert('Success', 'Your bank account has been added.')
            } else if (
                status === 'requiresaction' &&
                setupIntent?.nextAction?.type === 'verifyWithMicrodeposits'
            ) {
                // The payment must be verified with `verifyMicrodepositsForPayment`
                Alert.alert(
                    'Microdeposits',
                    'This account must be verified with microdeposits.'
                )
            } else {
                Alert.alert('Payment status:', status)
            }
        }
    }

    useEffect(() => {
        dispatch(fetchPaymentMethods)
    }, [])

    useEffect(() => {
        if (Object.keys(payoutSetup).length && shouldOpen) {
            showPayoutSetupSheet(payoutSetup)
        }
    }, [payoutSetup])

    if (payoutLoading || paymentLoading) {
        return <LoadingSpinner />
    }

    const payoutMethodTable = payoutMethods.length ? (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            style={styles.payoutMethodTable}
        >
            {payoutMethods.map((method) => (
                <Fragment key={method.id}>
                    <View style={styles.payoutMethodRow}>
                        <View>
                            <Text>{method.us_bank_account.bank_name}</Text>
                            <Text>{method.us_bank_account.account_type}</Text>
                        </View>
                        {method.default ? (
                            <Text style={styles.defaultMethodText}>
                                Default Method
                            </Text>
                        ) : (
                            <Button
                                mode="text"
                                onPress={() =>
                                    dispatch(setDefaultPayoutMethod(method.id))
                                }
                            >
                                Make Default
                            </Button>
                        )}
                        <Button
                            mode="text"
                            onPress={() =>
                                dispatch(deletePayoutMethod(method.id))
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
            <Page header="Payout Setup" style={styles.page}>
                <Text style={styles.text}>
                    We use Stripe to securely store your bank account
                    information. In order to be able to sell meals, you must
                    save a bank account for future payouts.
                </Text>
                <Divider />
                {payoutMethodTable}
                <Button
                    mode="contained"
                    onPress={() => {
                        setShouldOpen(true)
                        dispatch(fetchPayoutSetupInfo)
                    }}
                    style={styles.addMethodButton}
                >
                    Add Bank Account
                </Button>
                {(payoutError || hasError) && (
                    <HelperText type="error" visible={payoutError || hasError}>
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
    payoutMethodRow: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    payoutMethodTable: {
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

export default PayoutSetup
