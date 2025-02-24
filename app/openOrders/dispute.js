import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { useEffect, useState, useRef } from 'react'
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text
} from 'react-native'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import LoadingSpinner from '@components/LoadingSpinner'
import Page from '@components/Page'
import {
    disputeOrder,
    selectOpenOrders,
    selectOrderDisputeSuccess,
    selectOrderError,
    selectOrderLoading
} from '@store'
import { clearRouterStack } from '@utils'

const Dispute = () => {
    const navigation = useNavigation()
    const params = useLocalSearchParams()

    const openOrders = useSelector(selectOpenOrders)
    const orderError = useSelector(selectOrderError)
    const orderLoading = useSelector(selectOrderLoading)
    const disputeSuccess = useSelector(selectOrderDisputeSuccess)

    const dispatch = useDispatch()

    const scrollViewRef = useRef()

    const [reason, setReason] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (disputeSuccess) {
            clearRouterStack('/', navigation)
        }
    }, [disputeSuccess])

    if (!params.id) {
        clearRouterStack('/', navigation)
        return null
    }

    const order = openOrders.find((order) => order._id === params.id)

    if (!order) {
        clearRouterStack('/', navigation)
        return null
    }

    const onDisputePress = () => {
        if (!reason) {
            setError('Please enter a reason for the dispute')
            return
        }

        Alert.alert(
            'Dispute Order',
            'Are you sure you want to dispute this order? This action cannot be undone.',
            [
                {
                    text: 'Go back',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        dispatch(disputeOrder(order._id, reason))
                        clearRouterStack('/', navigation)
                    }
                }
            ]
        )
    }

    if (orderLoading) {
        return <LoadingSpinner />
    }

    return (
        <Page header={'Dispute Order'} style={styles.page}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={150}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, flexDirection: 'column' }}
                enabled
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    ref={scrollViewRef}
                >
                    <Text style={styles.text}>
                        Why do you want to dispute this order?{'\n\n'}Please
                        provide a valid reason, such as never receiving the item
                        or receiving an item that was not as described. We will
                        review your dispute and get back to you as soon as
                        possible, but please note that this could leave a
                        negative mark on your account if we find that the
                        dispute was not valid.
                    </Text>
                    <TextInput
                        label="Dispute Reason"
                        value={reason}
                        onChangeText={setReason}
                        style={styles.textInput}
                        multiline={true}
                    />
                    <Button
                        mode="contained"
                        style={styles.button}
                        onPress={onDisputePress}
                    >
                        Initiate Dispute
                    </Button>
                    {(!!error || orderError) && (
                        <HelperText type="error" style={styles.errorText}>
                            {error?.length
                                ? error
                                : orderError?.length
                                  ? orderError
                                  : 'An error occured'}
                        </HelperText>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </Page>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 10
    },
    text: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center'
    },
    page: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    textInput: {
        width: 350,
        height: 150,
        marginLeft: 10
    },
    errorText: {
        textAlign: 'center',
        fontSize: 16
    }
})

export default Dispute
