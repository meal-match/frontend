import React, { useEffect } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, HelperText } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import { displayTime } from '@utils'

import {
    cancelOrder,
    selectOrder,
    selectOrderLoading,
    selectOrderError,
    selectOrderID,
    clearOrder
} from '@store'
import LoadingSpinner from '@components/LoadingSpinner'
import Page from '@components/Page'

const OrderPlaced = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const order = useSelector(selectOrder)
    const orderLoading = useSelector(selectOrderLoading)
    const orderError = useSelector(selectOrderError)
    const orderID = useSelector(selectOrderID)

    useEffect(() => {
        if (orderID === null) {
            router.replace('/')
        }
    }, [orderID])

    if (orderLoading) {
        return <LoadingSpinner />
    }

    const returnHome = () => {
        router.replace('/')
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
                Pickup Time: {displayTime(order.pickupTime)}
            </Text>
            <View style={styles.divider} />
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
    divider: {
        width: '100%', // Divider spans full width of the screen
        height: 1, // Thin divider
        backgroundColor: '#828A8F', // Light gray color for the divider
        marginTop: 10 // Spacing between links and dividers
    },
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
        marginTop: 10
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
