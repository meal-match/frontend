import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, View, ScrollView, Image } from 'react-native'
import { List } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'

import Page from '@components/Page'
import { setSelectedOrder, selectOpenOrders, getOpenOrders } from '@store'

const OpenOrders = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [expandedId, setExpandedId] = useState(null)

    useEffect(() => {
        dispatch(getOpenOrders)
    }, [])

    const orders = useSelector(selectOpenOrders)

    const buyOrders = orders.filter((order) => order.type === 'buy')
    const sellOrders = orders.filter((order) => order.type === 'sell')

    const icons = {
        'Chick-Fil-A': require('@assets/images/icons/Chick-Fil-A.png'),
        "Dunkin' Donuts": require("@assets/images/icons/Dunkin' Donuts.png"),
        "Julia's Market": require("@assets/images/icons/Julia's Market.png"),
        'Panda Express': require('@assets/images/icons/Panda Express.png'),
        'Presidential Village': require('@assets/images/icons/Presidential Village.png'),
        "Raising Cane's": require("@assets/images/icons/Raising Cane's.png"),
        "Wendy's": require("@assets/images/icons/Wendy's.png")
    }

    const handleAccordianPress = (id) => {
        setExpandedId(expandedId === id ? null : id)
    }

    const handleItemPress = (item) => {
        dispatch(setSelectedOrder(item))
        router.push('/openOrders/orderDetails')
    }

    const orderList = (
        <ScrollView>
            <List.AccordionGroup
                expandedId={expandedId}
                onAccordionPress={(id) => handleAccordianPress(id)}
            >
                <List.Accordion
                    title={'Buy Orders'}
                    id={1}
                    right={(props) =>
                        expandedId === 1 ? (
                            <Ionicons
                                {...props}
                                name="chevron-down-outline"
                                size={28}
                            />
                        ) : (
                            <Ionicons
                                {...props}
                                name="chevron-forward-outline"
                                size={28}
                            />
                        )
                    }
                    left={(props) => (
                        <Ionicons {...props} name="cart-outline" size={28} />
                    )}
                >
                    {buyOrders.map((item) => (
                        <List.Item
                            key={item._id}
                            title={item.meal.entree}
                            onPress={() => handleItemPress(item)}
                            right={(props) => (
                                <Ionicons
                                    {...props}
                                    name="chevron-forward-outline"
                                    size={28}
                                />
                            )}
                            left={(props) => (
                                <Image
                                    {...props}
                                    source={icons[item.restaurant]}
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
                    ))}
                </List.Accordion>
                <List.Accordion
                    title={'Sell Orders'}
                    id={2}
                    right={(props) =>
                        expandedId === 2 ? (
                            <Ionicons
                                {...props}
                                name="chevron-down-outline"
                                size={28}
                            />
                        ) : (
                            <Ionicons
                                {...props}
                                name="chevron-forward-outline"
                                size={28}
                            />
                        )
                    }
                    left={(props) => (
                        <Ionicons {...props} name="cash-outline" size={28} />
                    )}
                >
                    {sellOrders.map((item) => (
                        <List.Item
                            key={item._id}
                            title={item.meal.entree}
                            onPress={() => handleItemPress(item)}
                            right={(props) => (
                                <Ionicons
                                    {...props}
                                    name="chevron-forward-outline"
                                    size={28}
                                />
                            )}
                            left={(props) => (
                                <Image
                                    {...props}
                                    source={icons[item.restaurant]}
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
                    ))}
                </List.Accordion>
            </List.AccordionGroup>
        </ScrollView>
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
