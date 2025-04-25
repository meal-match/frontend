import { useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Button, HelperText } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import Divider from '@components/Divider'
import LoadingSpinner from '@components/LoadingSpinner'
import Page from '@components/Page'
import {
    cancelOrder,
    clearOrder,
    selectOrder,
    selectOrderError,
    selectOrderID,
    selectOrderLoading
} from '@store'
import { clearRouterStack, displayPickerTime } from '@utils'

const OrderPlaced = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const order = useSelector(selectOrder)
    const orderLoading = useSelector(selectOrderLoading)
    const orderError = useSelector(selectOrderError)
    const orderID = useSelector(selectOrderID)

    useEffect(() => {
        if (orderID === null) {
            clearRouterStack('/', navigation)
        }
    }, [orderID])

    if (orderLoading) {
        return <LoadingSpinner />
    }

    const returnHome = () => {
        clearRouterStack('/', navigation)
        dispatch(clearOrder)
    }

    const cancel = async () => {
        Alert.alert(
            'Cancel Order',
            'Are you sure you want to cancel your order?',
            [
                {
                    text: 'Go back',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        dispatch(cancelOrder)
                        clearRouterStack('/', navigation)
                    }
                }
            ]
        )
    }

    return (
        <Page header="Order Placed" style={styles.page}>
            <Text style={styles.text}>
                Thank you for using MealMatch! Once your order is fulfilled, you
                will be charged and also receive a notification and pickup
                details.
                {'\n\n'}
                <Text style={styles.bold}>Meal:</Text> {order.entree}
                {'\n'}
                <Text style={styles.bold}>Pickup Time:</Text>{' '}
                {displayPickerTime(order.pickupTime)}
            </Text>
            <Divider />
            {orderError && (
                <HelperText type="error" style={styles.errorText}>
                    An error occured: {orderError}
                </HelperText>
            )}
            <View style={styles.buttonContainer}>
                <Button
                    onPress={cancel}
                    mode="outlined"
                    style={styles.footerButton}
                >
                    Cancel Order
                </Button>
                <Button
                    onPress={returnHome}
                    mode="contained"
                    style={styles.footerButton}
                >
                    Return to Home
                </Button>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    footerButton: {
        margin: 10
    },
    text: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10
    },
    errorText: {
        fontSize: 18
    },
    page: {
        display: 'flex',
        flexDirection: 'column'
    },
    bold: {
        fontWeight: 'bold'
    }
})

export default OrderPlaced
