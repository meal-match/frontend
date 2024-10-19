import React, { Fragment } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Page from '@components/Page'

const OrderDetails = () => {
    const orderData = {
        restaurant: 'Chick-fil-A',
        time: new Date(Date.now() + 5 * 60000).toISOString(),
        meal: {
            entree: 'Chicken Sandwich',
            entreeCustomizations: 'No pickles',
            side: 'Waffle Fries',
            sideCustomizations: [],
            drink: 'Lemonade',
            drinkCustomizations: [],
            sauces: ['Chick-fil-A Sauce', 'Buffalo Sauce']
        }
    }

    return (
        <Page header="Order Details">
            <View style={styles.orderDetails}>
                <Text>Restaurant: {orderData.restaurant}</Text>
                {Object.keys(orderData.meal).map((key) => {
                    if (
                        Array.isArray(orderData.meal[key]) &&
                        !orderData.meal[key].length
                    ) {
                        return <Fragment key={key} />
                    }
                    let label = key.replace(/([A-Z])/g, ' $1')
                    label = label.charAt(0).toUpperCase() + label.slice(1)
                    return (
                        <Text key={key}>
                            {label}:{' '}
                            {Array.isArray(orderData.meal[key])
                                ? orderData.meal[key].join(', ')
                                : orderData.meal[key]}
                        </Text>
                    )
                })}
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    orderDetails: {
        width: '80%'
    }
})

export default OrderDetails
