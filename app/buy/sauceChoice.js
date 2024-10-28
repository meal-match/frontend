import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import { List, Button } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import Page from '@components/Page'
import { setSauce, selectRestaurantData, selectOrder } from '@store'

const SauceChoice = () => {
    const restaurantData = useSelector(selectRestaurantData)
    const order = useSelector(selectOrder)
    const meal = restaurantData.meals.filter(
        (item) => item.entree === order.entree
    )[0]
    const sauceOptions = meal.sauces
    const router = useRouter()
    const dispatch = useDispatch()

    const [sauces, setSauces] = useState([])
    const maxSauces = meal.maxSauces

    const moveForward = async () => {
        await dispatch(setSauce(sauces))
        router.push('/buy/pickTime')
    }

    return (
        <Page header="Select Sauce">
            <FlatList
                data={sauceOptions.map((sauce) => ({ sauce }))}
                renderItem={({ item }) =>
                    maxSauces === 1 ? (
                        <List.Item
                            key={item.sauce}
                            title={item.sauce}
                            right={(props) => (
                                <Ionicons
                                    {...props}
                                    name="chevron-forward-outline"
                                    size={28}
                                />
                            )}
                            onPress={async () => {
                                setSauces([item.sauce])
                                moveForward()
                            }}
                            style={
                                sauceOptions.indexOf(item.sauce) !==
                                sauceOptions.length - 1
                                    ? {
                                          borderBottomColor: '#828A8F',
                                          borderBottomWidth: 1
                                      }
                                    : {}
                            }
                        />
                    ) : (
                        <List.Item
                            key={item.sauce}
                            title={item.sauce}
                            right={(props) => (
                                <Ionicons
                                    {...props}
                                    name={
                                        sauces.includes(item.sauce)
                                            ? 'checkbox'
                                            : 'square-outline'
                                    }
                                    size={28}
                                />
                            )}
                            onPress={async () => {
                                if (sauces.includes(item.sauce)) {
                                    setSauces(
                                        sauces.filter(
                                            (sauce) => sauce !== item.sauce
                                        )
                                    )
                                } else if (sauces.length < maxSauces) {
                                    setSauces([...sauces, item.sauce])
                                }
                            }}
                            style={
                                sauceOptions.indexOf(item.sauce) !==
                                sauceOptions.length - 1
                                    ? {
                                          borderBottomColor: '#828A8F',
                                          borderBottomWidth: 1
                                      }
                                    : {}
                            }
                        />
                    )
                }
            />
            {sauceOptions !== null &&
                sauceOptions.length > 0 &&
                maxSauces > 1 && (
                    <View>
                        <Button
                            onPress={async () => moveForward()}
                            mode="contained"
                            style={{ margin: 15 }}
                        >
                            Next
                        </Button>
                    </View>
                )}
        </Page>
    )
}

export default SauceChoice
