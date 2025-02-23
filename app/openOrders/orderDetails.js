import React, { useEffect } from 'react'
import { ScrollView, Text, StyleSheet, Image, View, Alert } from 'react-native'
import Page from '@components/Page'
import {
    selectActiveOpenOrder,
    cancelOrderBuy,
    selectOpenOrdersError
} from '@store'
import { useSelector, useDispatch } from 'react-redux'
import Divider from '@components/Divider'
import { Button } from 'react-native-paper'
import { useRouter } from 'expo-router'

const OrderDetails = () => {
    const order = useSelector(selectActiveOpenOrder)
    const openOrdersError = useSelector(selectOpenOrdersError)

    const dispatch = useDispatch()
    const router = useRouter()

    const cancelOrder = () => {
        Alert.alert(
            'Cancel Order',
            'Are you sure you want to cancel this order?',
            [
                {
                    text: 'Go back',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => dispatch(cancelOrderBuy)
                }
            ]
        )
    }

    useEffect(() => {
        if (!order) {
            router.back()
        }
    }, [order])

    useEffect(() => {
        if (openOrdersError) {
            Alert.alert('Error', JSON.stringify(openOrdersError))
        }
    }, [openOrdersError])

    const icons = {
        'Chick-Fil-A': require('@assets/images/icons/Chick-Fil-A.png'),
        "Dunkin' Donuts": require("@assets/images/icons/Dunkin' Donuts.png"),
        "Julia's Market": require("@assets/images/icons/Julia's Market.png"),
        'Panda Express': require('@assets/images/icons/Panda Express.png'),
        'Presidential Village': require('@assets/images/icons/Presidential Village.png'),
        "Raising Cane's": require("@assets/images/icons/Raising Cane's.png"),
        "Wendy's": require("@assets/images/icons/Wendy's.png")
    }

    const buyActionsComponent = order && (
        <View style={styles.buttonContainer}>
            {order.status === 'Confirmed' && (
                <Button
                    mode="contained"
                    style={styles.footerButton}
                    // TODO: Implement this report issue functionality
                    onPress={() => {}}
                >
                    Report Issue
                </Button>
            )}
            {order.status === 'Pending' && (
                <Button
                    mode="contained"
                    style={styles.footerButton}
                    onPress={cancelOrder}
                >
                    Cancel Order
                </Button>
            )}
        </View>
    )
    const sellActionsComponent = order && (
        <View style={styles.buttonContainer}>
            {order.status === 'Confirmed' && (
                <Button
                    mode="contained"
                    style={styles.footerButton}
                    // TODO: Implement this report issue functionality
                    onPress={() => {}}
                >
                    Report Issue
                </Button>
            )}
        </View>
    )

    const content = order && (
        <ScrollView style={styles.scrollContainer}>
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        display: 'flex'
                    }}
                >
                    <Text style={{ ...styles.bold, ...styles.text }}>
                        Restaurant:
                    </Text>
                    <Image source={icons[order.restaurant]} />
                    <Text style={styles.text}>{order.restaurant}</Text>
                </View>
                <Text style={styles.text}>
                    <Text style={styles.bold}>Entree: </Text>
                    {order.meal.entree}{' '}
                    {order.meal.entreeCustomizations.length > 0
                        ? `(${order.meal.entreeCustomizations.join(',')})`
                        : ''}
                    {'\n'}
                    <Text style={styles.bold}>Side:</Text> {order.meal.side}{' '}
                    {order.meal.sideCustomizations.length > 0
                        ? `(${order.meal.sideCustomizations.join(',')})`
                        : ''}
                    {'\n'}
                    <Text style={styles.bold}>Drink:</Text> {order.meal.drink}
                    {'\n\n'}
                    <Text style={styles.bold}>Status: </Text>
                    {order.status === 'Confirmed' ? 'Confirmed' : 'Pending'}
                </Text>
                {order.status === 'Confirmed' ? (
                    <>
                        <Text style={styles.text}>
                            <Text
                                style={{
                                    ...styles.text,
                                    ...styles.bold
                                }}
                            >
                                Ready at:{' '}
                            </Text>
                            {order.readyTime}
                        </Text>
                        <Image
                            source={{ uri: order.receiptImage }}
                            style={{
                                width: '100%',
                                height: 400
                            }}
                            resizeMode="contain"
                        />
                    </>
                ) : null}
                <Divider />
                {/* Even though they are very similar, I left them separate because down the road we should make more */}
                {order.type === 'buy'
                    ? buyActionsComponent
                    : sellActionsComponent}
            </View>
        </ScrollView>
    )

    return (
        <Page
            header={order ? order.meal.entree : 'Error occurred'}
            style={styles.page}
        >
            {order ? (
                content
            ) : (
                <Text style={styles.errorText}>
                    An unknown error has occured. Please try again later.
                </Text>
            )}
        </Page>
    )
}

export default OrderDetails

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
        flexDirection: 'column',
        flex: 1
    },
    bold: {
        fontWeight: 'bold'
    },
    scrollContainer: {
        flexDirection: 'column',
        flex: 1
    }
})
