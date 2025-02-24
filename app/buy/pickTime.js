import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Button, Dialog, HelperText, Portal } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import LoadingSpinner from '@components/LoadingSpinner'
import Page from '@components/Page'
import {
    placeOrder,
    selectOrder,
    selectOrderError,
    selectOrderID,
    selectOrderLoading,
    selectRestaurantData,
    setPickupTime
} from '@store'
import {
    clearRouterStack,
    convertTimeToDateObject,
    displayPickerTime,
    getCloseTimeFromHoursObject,
    getOpenTimeFromHoursObject
} from '@utils'

const PickTime = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [dialogVisible, setDialogVisible] = useState(false)
    const [dt, setDt] = useState(
        new Date(new Date().setMinutes(new Date().getMinutes() + 30))
    )
    const [warningText, setWarningText] = useState('')

    const onConfirm = () => {
        setDialogVisible(true)
        dispatch(setPickupTime(dt))
    }

    const order = useSelector(selectOrder)
    const orderID = useSelector(selectOrderID)
    const orderLoading = useSelector(selectOrderLoading)
    const orderError = useSelector(selectOrderError)
    const restaurantData = useSelector(selectRestaurantData)

    useEffect(() => {
        if (orderID !== null) {
            clearRouterStack('buy/orderPlaced', navigation)
        }
    }, [orderID])

    useEffect(() => {
        if (!restaurantData.hours) {
            setWarningText('')
            return
        }
        const closeTimeString = getCloseTimeFromHoursObject(
            restaurantData.hours
        )
        const closeTime = convertTimeToDateObject(closeTimeString)
        const openTimeString = getOpenTimeFromHoursObject(restaurantData.hours)
        const openTime = convertTimeToDateObject(openTimeString)
        if (dt < openTime || dt > closeTime) {
            setWarningText(
                "Warning: the time you have selected is outside the restaurant's normal hours of operation."
            )
        } else {
            setWarningText('')
        }
    }, [dt])

    if (orderLoading) {
        return <LoadingSpinner />
    }

    return (
        <Page header="Select Time" style={styles.page}>
            <Text style={styles.text}>
                Please select a time for your order to be picked up. Keep in
                mind that this time will have a range of 10 minutes before and
                after.
            </Text>
            {orderError && (
                <HelperText type="error" style={styles.text}>
                    An error occurred: {orderError}
                </HelperText>
            )}
            <Text style={styles.text}>
                Open Today: {getOpenTimeFromHoursObject(restaurantData.hours)} -{' '}
                {getCloseTimeFromHoursObject(restaurantData.hours)}
            </Text>
            <DateTimePicker
                display="spinner"
                mode="time"
                value={dt}
                onChange={(event, selectedDate) => setDt(selectedDate)}
                themeVariant="light"
            />
            {warningText.length > 0 && (
                <Text style={styles.warning}>{warningText}</Text>
            )}
            <Button onPress={() => onConfirm()} mode="contained">
                Review Order
            </Button>
            <Portal>
                <Dialog visible={dialogVisible}>
                    <Dialog.Title>Confirm Order</Dialog.Title>
                    <Dialog.Content>
                        <Text>
                            Your order will be ready at {displayPickerTime(dt)}.
                            {'\n\n'}
                            Entree: {order.entree}
                            {order.entreeCustomizations.length > 0
                                ? ` (${order.entreeCustomizations.join(', ')})`
                                : ' '}
                            {'\n'}
                            Side: {order.side}
                            {order.sideCustomizations.length > 0
                                ? ` (${order.sideCustomizations.join(', ')})`
                                : ' '}
                            {'\n'}
                            Drink: {order.drink}
                            {'\n'}
                            {order.sauce?.length > 0 &&
                                `Sauce: ${order.sauce.join(', ')}`}
                            {'\n'}
                            <Text style={styles.bold}>
                                You will be charged $6 for this order after a
                                seller confirms this order.
                            </Text>
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={() => {
                                setDialogVisible(false)
                            }}
                        >
                            Go Back
                        </Button>
                        <Button
                            onPress={() => {
                                setDialogVisible(false)
                                dispatch(placeOrder)
                            }}
                        >
                            Place Order
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Page>
    )
}

const styles = StyleSheet.create({
    page: {
        paddingLeft: 10,
        paddingRight: 10
    },
    text: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18
    },
    warning: {
        marginTop: 10,
        marginBottom: 10,
        color: 'red'
    },
    bold: {
        fontWeight: 'bold'
    }
})

export default PickTime
