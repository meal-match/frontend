import React, { Fragment } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import { Redirect } from 'expo-router'

import Divider from '@components/Divider'
import ErrorDialog from '@components/ErrorDialog'
import LoadingSpinner from '@components/LoadingSpinner'
import Page from '@components/Page'
import {
    resetClaimOrderError,
    selectClaimedOrder,
    selectClaimedOrderError,
    selectClaimedOrderLoading,
    unclaimOrder
} from '@store'
import { formatTimeWithIntl } from '@utils'

const OrderDetails = () => {
    const dispatch = useDispatch()

    const orderData = useSelector(selectClaimedOrder)
    const claimedOrderError = useSelector(selectClaimedOrderError)
    const claimedOrderLoading = useSelector(selectClaimedOrderLoading)

    const onUnclaimPress = () => {
        dispatch(unclaimOrder)
    }

    if (!orderData) {
        return <Redirect href="/sell" />
    }

    if (claimedOrderLoading) {
        return <LoadingSpinner />
    }

    return (
        <Page header="Order Details">
            <View style={styles.orderDetails}>
                <Text style={styles.text}>
                    Restaurant: {orderData.restaurant}
                    {'\n'}
                </Text>
                {Object.keys(orderData.meal).map((key) => {
                    if (
                        (Array.isArray(orderData.meal[key]) &&
                            !orderData.meal[key].length) ||
                        key === '_id'
                    ) {
                        return <Fragment key={key} />
                    }
                    let label = key.replace(/([A-Z])/g, ' $1')
                    label = label.charAt(0).toUpperCase() + label.slice(1)
                    return (
                        <Text key={key} style={styles.text}>
                            {label}:{' '}
                            {Array.isArray(orderData.meal[key])
                                ? orderData.meal[key].join(', ')
                                : orderData.meal[key]}
                        </Text>
                    )
                })}
                <Text style={styles.text}>
                    {'\n'}
                    Desired Pickup Time:{' '}
                    {formatTimeWithIntl(orderData.desiredPickupTime)}
                </Text>
            </View>
            <Divider />
            <View style={styles.buttonMenu}>
                <Button mode="contained" onPress={onUnclaimPress}>
                    Unclaim Order
                </Button>
            </View>
            <ErrorDialog
                error={claimedOrderError}
                onClose={() => dispatch(resetClaimOrderError)}
            />
        </Page>
    )
}

const styles = StyleSheet.create({
    orderDetails: {
        width: '80%',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        fontSize: 18
    },
    buttonMenu: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10
    }
})

export default OrderDetails
