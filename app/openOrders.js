import React from 'react'
import { useSelector } from 'react-redux'
import { FlatList, Text, View } from 'react-native'
import { List } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'

import Page from '@components/Page'
import { selectProfileData } from '@store'

const OpenOrders = () => {
    const profileData = useSelector(selectProfileData)

    const orders = profileData.openOrders

    const orderList = (
        <FlatList
            data={orders}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
                <List.Item
                    title={item.type}
                    right={(props) => (
                        <Ionicons
                            {...props}
                            name="chevron-forward-outline"
                            size={28}
                        />
                    )}
                    style={
                        orders.indexOf(item) !== orders.length - 1
                            ? {
                                  borderBottomColor: '#828A8F',
                                  borderBottomWidth: 1
                              }
                            : {}
                    }
                />
            )}
        />
    )

    const emptyOrders = (
        <View>
            <Text>You have no open orders</Text>
        </View>
    )

    return (
        <Page header="Open Orders">
            {orders && orders.length > 0 ? orderList : emptyOrders}
        </Page>
    )
}

export default OpenOrders
