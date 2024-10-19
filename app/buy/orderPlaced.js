import React from 'react'
import Page from '@components/Page'
import { Text, View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { selectOrder } from '@store'
import { useRouter } from 'expo-router'

const OrderPlaced = () => {
    const router = useRouter()
    const order = useSelector(selectOrder)
    return (
        <Page header="Order Placed">
            <Text>
                Thank you for using MealMatch!{'\n'}Once your order is
                fulfilled, you will receive a notification and pickup details.
                {'\n\n'}
                Meal: {order.entree}
                {'\n'}
                Pickup Time: {order.pickupTime}
            </Text>
            <View style={styles.divider} />
            <View>
                <Button mode="contained" style={styles.footerButton}>
                    Cancel Order
                </Button>
                <Button
                    onPress={() => router.push('/')}
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
        // Can not get buttons to float to bottom . . . fix later
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        rowGap: 10
    },
    footerButton: {
        margin: 10
    }
})

export default OrderPlaced
