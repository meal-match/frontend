import React, { useState } from 'react'
import { TimePickerModal } from 'react-native-paper-dates'
import Page from '@components/Page'
import { Text } from 'react-native'
import { Button, Dialog, Portal } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { selectOrder, setPickupTime } from '@store'
import { clearRouterStack } from '@utils'

const PickTime = () => {
    const [pickerVisible, setPickerVisible] = useState(false)
    const [dialogVisible, setDialogVisible] = useState(false)
    const dispatch = useDispatch()
    let dt = new Date()
    dt = new Date(dt.setMinutes(dt.getMinutes() + 30))
    const [hours, setHours] = useState(dt.getHours())
    const [minutes, setMinutes] = useState(dt.getMinutes())
    const onDismiss = () => {
        setPickerVisible(false)
    }
    const onConfirm = async ({ hours, minutes }) => {
        setPickerVisible(false)
        setHours(hours)
        setMinutes(minutes)
        setDialogVisible(true)
        await dispatch(setPickupTime(`${hours}:${minutes}`))
    }

    const order = useSelector(selectOrder)

    return (
        <Page header="Select Time">
            <Text>
                Please select a time for your order to be picked up. Keep in
                mind that this time will have a range of 10 minutes before and
                after.
            </Text>
            <Button onPress={() => setPickerVisible(true)} mode="outlined">
                Pick Time
            </Button>
            <TimePickerModal
                visible={pickerVisible}
                locale="en-GB"
                hours={hours}
                minutes={minutes}
                onConfirm={onConfirm}
                onDismiss={onDismiss}
                defaultInputType="keyboard"
            />
            <Portal>
                <Dialog visible={dialogVisible}>
                    <Dialog.Title>Confirm Order</Dialog.Title>
                    <Dialog.Content>
                        <Text>
                            Your order will be ready at {hours}:{minutes}.{' '}
                            {'\n'}
                            Meal: {order.entree}
                            {'\n'}
                            Side: {order.side}
                            {'\n'}
                            Drink: {order.drink}
                            {'\n'}
                            Sauce: {order.sauce}
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button
                            onPress={() => {
                                setDialogVisible(false)
                                clearRouterStack('/buy/orderPlaced')
                            }}
                        >
                            Confirm
                        </Button>
                        <Button
                            onPress={() => {
                                setDialogVisible(false)
                            }}
                        >
                            Go Back
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </Page>
    )
}

export default PickTime
