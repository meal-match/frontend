import React, { useEffect } from 'react'
import {
    Image,
    StyleSheet,
    View,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'

import Divider from '@components/Divider'
import ErrorDialog from '@components/ErrorDialog'
import LoadingSpinner from '@components/LoadingSpinner'
import Page from '@components/Page'
import PaymentSetupRedirect from '@components/PaymentSetupRedirect'
import {
    claimOrder,
    getOrders,
    resetClaimOrderError,
    selectClaimedOrder,
    selectClaimedOrderLoading,
    selectClaimedOrderError,
    selectOrders,
    selectOrdersLoading,
    selectOrdersError,
    selectProfileData
} from '@store'
import { clearRouterStack, formatTimeWithIntl, isWithin15Minutes } from '@utils'

const { width: screenWidth } = Dimensions.get('window')

const Sell = () => {
    const dispatch = useDispatch()

    const orders = useSelector(selectOrders)
    const ordersLoading = useSelector(selectOrdersLoading)
    const ordersError = useSelector(selectOrdersError)

    const claimedOrder = useSelector(selectClaimedOrder)
    const claimedOrderLoading = useSelector(selectClaimedOrderLoading)
    const claimedOrderError = useSelector(selectClaimedOrderError)

    const profileData = useSelector(selectProfileData)

    const pressHandler = (order) => {
        dispatch(claimOrder(order))
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

    useEffect(() => {
        if (claimedOrder) {
            clearRouterStack('/sell/orderDetails')
        }
    }, [claimedOrder])

    useEffect(() => {
        dispatch(getOrders)

        // Refresh orders every 15 seconds
        const interval = setInterval(() => {
            dispatch(getOrders)
        }, 15000)
        return () => clearInterval(interval)
    }, [])

    if (profileData.paymentSetupIntent) {
        return <PaymentSetupRedirect />
    }

    if (ordersLoading || claimedOrderLoading) {
        return <LoadingSpinner />
    }

    const emptyOrders = (
        <View style={styles.emptyOrders}>
            <Text style={styles.emptyOrdersText}>
                No orders are available at this time. Come back soon!
            </Text>
        </View>
    )

    const ordersList = orders.map((option, index) => (
        <View key={option._id}>
            <TouchableOpacity
                style={styles.orderItem}
                onPress={() => pressHandler(option)}
            >
                <View style={styles.rowContainer}>
                    <View style={styles.textColumn}>
                        <View style={styles.rowSubcontainer}>
                            <Image
                                source={icons[option.restaurant]}
                                resizeMode="contain"
                                style={{ maxWidth: 50, maxHeight: 50 }}
                            />
                            <Text style={styles.location}>
                                {option.restaurant}
                            </Text>
                        </View>
                        <Text
                            style={[
                                styles.timeText,
                                isWithin15Minutes(option.desiredPickupTime) &&
                                    styles.highlightedLink // Apply different style if within 15 minutes
                            ]}
                        >
                            {formatTimeWithIntl(option.desiredPickupTime)}
                        </Text>
                    </View>
                    <View style={styles.rowEndContainer}>
                        <Ionicons
                            name="chevron-forward-outline"
                            size={28}
                            color="#000000"
                        />
                    </View>
                </View>
            </TouchableOpacity>
            {index < orders.length - 1 && <Divider />}
            <ErrorDialog
                error={claimedOrderError}
                onClose={() => dispatch(resetClaimOrderError)}
            />
        </View>
    ))

    let content = null
    if (ordersError) {
        content = (
            <View style={styles.emptyOrders}>
                <Text style={styles.emptyOrdersText}>
                    Error loading orders: {ordersError}. Please try again later.
                </Text>
            </View>
        )
    } else {
        content = orders.length === 0 ? emptyOrders : ordersList
    }

    return (
        <Page header="Select an Order to Claim" style={styles.page}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {content}
            </ScrollView>
        </Page>
    )
}

const styles = StyleSheet.create({
    page: {
        headerTitleAlign: 'left',
        flex: 1
    },
    highlightedLink: {
        color: '#FF0000' // A different background color for items within 15 minutes
    },
    scrollContainer: {
        flexGrow: 1, // Allow the content to grow and be scrollable
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingTop: (screenWidth * 0.1) / 3,
        paddingBottom: (screenWidth * 0.1) / 3,
        gap: screenWidth * 0.01 // Optional: padding around the content
    },
    orderItem: {
        width: screenWidth * 0.95,
        padding: 4
    },
    location: {
        fontSize: 25
    },
    timeText: {
        fontSize: 15
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Ensures items in each row align properly
        width: '100%',
        padding: 4 // Spacing between links and dividers
    },
    rowSubcontainer: {
        flexDirection: 'row',
        marginLeft: -10
    },
    rowEndContainer: {
        flexDirection: 'row'
    },
    textColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 8
    },
    emptyOrders: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '80%'
    },
    emptyOrdersText: {
        fontSize: 24
    }
})

export default Sell
