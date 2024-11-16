import React, { useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, HelperText } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import {
    cancelOrder,
    selectOrder,
    selectOrderLoading,
    selectOrderError,
    selectOrderID,
    clearOrder
} from '@store'
import Divider from '@components/Divider'
import LoadingSpinner from '@components/LoadingSpinner'
import Page from '@components/Page'
import { displayPickerTime, clearRouterStack } from '@utils'

const OrderPlaced = () => {
    const dispatch = useDispatch()

    const order = useSelector(selectOrder)
    const orderLoading = useSelector(selectOrderLoading)
    const orderError = useSelector(selectOrderError)
    const orderID = useSelector(selectOrderID)

    useEffect(() => {
        if (orderID === null) {
            clearRouterStack('/')
        }
    }, [orderID])

    if (orderLoading) {
        return <LoadingSpinner />
    }

    const returnHome = () => {
        clearRouterStack('/')
        dispatch(clearOrder)
    }

    return (
        <Page header="Order Placed" style={styles.page}>
            <Text style={styles.text}>
                Thank you for using MealMatch! Once your order is fulfilled, you
                will receive a notification and pickup details.
                {'\n\n'}
                Meal: {order.entree}
                {'\n'}
                Pickup Time: {displayPickerTime(order.pickupTime)}
            </Text>
            <Divider />
            {orderError && (
                <HelperText type="error" style={styles.errorText}>
                    An error occured: {orderError}
                </HelperText>
            )}
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => dispatch(cancelOrder)}
                    mode="contained"
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
    }
})

export default OrderPlaced
