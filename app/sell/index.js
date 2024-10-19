import React, { useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'

import Page from '@components/Page'
import { formatTimeWithIntl, isWithin15Minutes } from '@utils'

const { width: screenWidth } = Dimensions.get('window')

const Sell = () => {
    const router = useRouter()

    const options = [
        {
            label: 'Chick-fil-A'
        },
        {
            label: 'Panda'
        },
        {
            label: 'Dunkin'
        },
        {
            label: 'Canes'
        },
        {
            label: 'Pres-Deli'
        },
        {
            label: 'Julias'
        },
        {
            label: "Wendy's"
        },
        {
            label: 'Chick-fil-A'
        }
    ]

    for (let i = 0; i < options.length; i++) {
        options[i].time = new Date(
            Date.now() + (i + 1) * 5 * 60000
        ).toISOString()
        options[i].id = i
    }

    const pressHandler = (order) => {
        console.log(order)
        router.replace('/sell/orderDetails')
        // dispatch action to claim order
        // display loading state while action is occurring
        // navigate to order details page if successful
    }

    useEffect(() => {
        // dispatch action to get current buy orders
        // repeat said action every so often?
    }, [])

    const emptyOrders = (
        <View style={styles.emptyOrders}>
            <Text style={styles.emptyOrdersText}>
                No orders are available at this time. Come back soon!
            </Text>
        </View>
    )

    const ordersList = options.map((option, index) => (
        <View key={option.id}>
            <TouchableOpacity
                style={styles.orderItem}
                onPress={() => pressHandler(option)}
            >
                <View style={styles.rowContainer}>
                    <View style={styles.textColumn}>
                        <Text style={styles.location}>{option.label}</Text>
                        <Text
                            style={[
                                styles.timeText,
                                isWithin15Minutes(option.time) &&
                                    styles.highlightedLink // Apply different style if within 30 minutes
                            ]}
                        >
                            {formatTimeWithIntl(option.time)}
                        </Text>
                    </View>
                    <View style={styles.rowEndContainer}>
                        <Text style={styles.rowEndText}>Sell</Text>
                        <Ionicons
                            name="chevron-forward-outline"
                            size={28}
                            color="#000000"
                        />
                    </View>
                </View>
            </TouchableOpacity>
            {index < options.length - 1 && <View style={styles.divider} />}
        </View>
    ))

    return (
        <Page header="Select Order" style={styles.page}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {options.length === 0 ? emptyOrders : ordersList}
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
        color: '#FF0000' // A different background color for items within 30 minutes
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
        width: screenWidth * 0.9,
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
    rowEndContainer: {
        flexDirection: 'row'
    },
    rowEndText: {
        fontSize: 22,
        marginRight: 4
    },
    divider: {
        width: '100%', // Divider spans full width of the screen
        height: 1, // Thin divider
        backgroundColor: '#828A8F' // Light gray color for the divider
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
