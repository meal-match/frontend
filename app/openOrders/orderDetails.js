import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import Divider from '@components/Divider'
import ImageViewer from '@components/ImageViewer'
import LoadingSpinner from '@components/LoadingSpinner'
import Page from '@components/Page'
import {
    cancelOrderBuy,
    clearDisputeOrder,
    getOpenOrders,
    selectOpenOrders,
    selectOpenOrdersError,
    selectOpenOrdersLoading,
    unclaimOrder
} from '@store'
import { clearRouterStack } from '@utils'

const OrderDetails = () => {
    const navigation = useNavigation()
    const params = useLocalSearchParams()
    const router = useRouter()

    const openOrdersError = useSelector(selectOpenOrdersError)
    const openOrders = useSelector(selectOpenOrders)
    const openOrdersLoading = useSelector(selectOpenOrdersLoading)

    const order = openOrders.find((order) => order._id === params.id)

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const cancelOrderPress = () => {
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
                    onPress: () => {
                        clearRouterStack('/', navigation)
                        dispatch(cancelOrderBuy(order._id))
                    }
                }
            ]
        )
    }

    const reportOrderPress = () => {
        dispatch(clearDisputeOrder)
        router.push(`/openOrders/dispute?id=${order._id}`)
    }

    const unclaimOrderPress = () => {
        Alert.alert(
            'Unclaim Order',
            'Are you sure you want to unclaim this order?',
            [
                {
                    text: 'Go back',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        dispatch(unclaimOrder)
                        clearRouterStack('/', navigation)
                    }
                }
            ]
        )
    }

    useEffect(() => {
        if (!openOrdersLoading && loading) {
            setLoading(false)
        }
    }, [openOrdersLoading, loading])

    useEffect(() => {
        if (openOrdersError) {
            Alert.alert('Error', JSON.stringify(openOrdersError))
        }
    }, [openOrdersError])

    useEffect(() => {
        if (!openOrders.length) {
            dispatch(getOpenOrders)
            setLoading(true)
        }
    }, [])

    if (loading) {
        return <LoadingSpinner />
    }

    const icons = {
        'Chick-Fil-A': require('@assets/images/icons/Chick-Fil-A.png'),
        "Dunkin' Donuts": require("@assets/images/icons/Dunkin' Donuts.png"),
        "Julia's Market": require("@assets/images/icons/Julia's Market.png"),
        'Panda Express': require('@assets/images/icons/Panda Express.png'),
        'Presidential Village': require('@assets/images/icons/Presidential Village.png'),
        "Raising Cane's": require("@assets/images/icons/Raising Cane's.png"),
        "Wendy's": require("@assets/images/icons/Wendy's.png")
    }

    const isConfirmed = order && order.status === 'Confirmed'
    const isDisputed = order && order.status === 'Disputed'

    const buyActionsComponent = order && (
        <View style={styles.buttonContainer}>
            {isConfirmed && (
                <Button
                    mode="contained"
                    style={styles.footerButton}
                    onPress={reportOrderPress}
                >
                    Report Issue
                </Button>
            )}
            {order.status === 'Pending' && (
                <Button
                    mode="contained"
                    style={styles.footerButton}
                    onPress={cancelOrderPress}
                >
                    Cancel Order
                </Button>
            )}
            {isDisputed && (
                <Text style={styles.bottomText}>
                    You have disputed this order. We will review the dispute and
                    get back to you as soon as possible.
                </Text>
            )}
        </View>
    )
    const sellActionsComponent = order && (
        <View style={styles.buttonContainer}>
            {isConfirmed && (
                <Text style={styles.bottomText}>
                    If the buyer does not report any issues, you will get paid
                    within a few hours. Hang tight!
                </Text>
            )}
            {order.status === 'Claimed' && (
                <Button
                    mode="contained"
                    style={styles.footerButton}
                    onPress={unclaimOrderPress}
                >
                    Unclaim Order
                </Button>
            )}
            {isDisputed && (
                <Text style={styles.bottomText}>
                    The buyer has disputed this order. We will review the
                    dispute and get back to you as soon as possible.
                </Text>
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
                    {order.status}
                </Text>
                {isDisputed || isConfirmed ? (
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
                            {'\n'}
                            <Text
                                style={{
                                    ...styles.text,
                                    ...styles.bold
                                }}
                            >
                                Order name:{' '}
                            </Text>
                            {order.sellerName}
                        </Text>
                        <ImageViewer
                            imageUri={order.receiptImage}
                            style={styles.receiptImage}
                        />
                    </>
                ) : null}
                {isDisputed && (
                    <Text style={styles.text}>
                        <Text style={styles.bold}>Dispute Reason: </Text>
                        {order.disputeReason}
                    </Text>
                )}
                <Divider />
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
                <View style={styles.errorContent}>
                    <Text style={styles.errorText}>
                        An unknown error has occured. Please try again later.
                    </Text>
                </View>
            )}
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
        fontSize: 24
    },
    errorContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    receiptImage: {
        width: '100%',
        height: 400,
        marginBottom: 10
    },
    bottomText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10
    }
})

export default OrderDetails
