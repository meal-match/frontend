import { useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Linking, StyleSheet, Text } from 'react-native'
import { Button, HelperText } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import Divider from '@components/Divider'
import LoadingSpinner from '@components/LoadingSpinner'
import Page from '@components/Page'
import {
    createPayoutAccount,
    createPayoutAccountSetupLink,
    fetchPayoutAccountSetupStatus,
    selectPayoutAccount,
    selectPayoutAccountSetupLink,
    selectPayoutError,
    selectPayoutLoading,
    selectPayoutSetupIsComplete
} from '@store'
import { clearRouterStack } from '@utils'

const Home = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [shouldOpen, setShouldOpen] = useState(false)

    const payoutAccount = useSelector(selectPayoutAccount)
    const payoutLoading = useSelector(selectPayoutLoading)
    const payoutError = useSelector(selectPayoutError)
    const payoutAccountSetupLink = useSelector(selectPayoutAccountSetupLink)
    const payoutSetupIsComplete = useSelector(selectPayoutSetupIsComplete)

    useEffect(() => {
        dispatch(createPayoutAccount)
        dispatch(fetchPayoutAccountSetupStatus)
    }, [])

    useEffect(() => {
        if (payoutAccountSetupLink && shouldOpen) {
            Linking.openURL(payoutAccountSetupLink)
        }
    }, [payoutAccountSetupLink, shouldOpen])

    const handleInformation = () => {
        dispatch(createPayoutAccountSetupLink)
        setShouldOpen(true)
    }

    const handleGoHome = () => {
        clearRouterStack('/', navigation)
    }

    if (payoutLoading) {
        return <LoadingSpinner />
    }

    const completeAccountText =
        'You have successfully set up your Stripe account for payouts! You can now start selling meals on MealMatch.'
    const completeAccountButtonText = 'Update'

    const incompleteAccountText =
        "MealMatch partners with Stripe to help you receive payments securely. You will be redirected to Stripe's secure portal to complete this process."
    const incompleteAccountButtonText = 'Add'

    const accountContent = (
        <>
            <Text style={styles.text}>
                {payoutSetupIsComplete
                    ? completeAccountText
                    : incompleteAccountText}
            </Text>
            <Divider />
            <Button
                mode="contained"
                onPress={handleInformation}
                style={styles.button}
            >
                {payoutSetupIsComplete
                    ? completeAccountButtonText
                    : incompleteAccountButtonText}{' '}
                Information
            </Button>
        </>
    )

    const noAccountContent = (
        <>
            <Text style={styles.text}>
                You do not have a Stripe account. An error must have occured;
                please try again later.
            </Text>
            <Divider />
            <Button
                mode="contained"
                onPress={handleGoHome}
                style={styles.button}
            >
                Go Home
            </Button>
        </>
    )

    return (
        <Page header="Payout Setup" style={styles.page}>
            {payoutAccount ? accountContent : noAccountContent}

            {payoutError && (
                <HelperText type="error">Something went wrong!</HelperText>
            )}
        </Page>
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
    button: {
        marginTop: 10,
        marginBottom: 10
    }
})

export default Home
