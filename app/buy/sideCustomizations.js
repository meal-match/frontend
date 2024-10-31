import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import { List, Button } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import Page from '@components/Page'
import {
    setSideCustomizations,
    selectRestaurantData,
    selectOrder
} from '@store'

const SideCustomizations = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [customizations, setCustomizations] = useState([])
    const restaurantData = useSelector(selectRestaurantData)
    const order = useSelector(selectOrder)
    const meal = restaurantData.meals.filter(
        (item) => item.entree === order.entree
    )[0]

    const side = meal.sides.filter((item) => item.side === order.side)[0]

    const sideCustomizationOptions = side.sideCustomizations

    const maxSideCustomizations = side.maxSideCustomizations

    const moveForward = () => {
        dispatch(setSideCustomizations(customizations))
        router.push('/buy/drinkChoice')
    }

    return (
        <Page header="Customize Side">
            <FlatList
                data={sideCustomizationOptions}
                renderItem={(option) =>
                    maxSideCustomizations === 1 ? (
                        <List.Item
                            key={option.item}
                            title={option.item}
                            right={(props) => (
                                <Ionicons
                                    {...props}
                                    name="chevron-forward-outline"
                                    size={28}
                                />
                            )}
                            onPress={() => {
                                setCustomizations([
                                    ...customizations,
                                    option.item
                                ])
                                moveForward()
                            }}
                            style={
                                sideCustomizationOptions.indexOf(
                                    option.item
                                ) !==
                                sideCustomizationOptions.length - 1
                                    ? {
                                          borderBottomColor: '#828A8F',
                                          borderBottomWidth: 1
                                      }
                                    : {}
                            }
                        />
                    ) : (
                        <List.Item
                            key={option.item}
                            title={option.item}
                            right={(props) => (
                                <Ionicons
                                    {...props}
                                    name={
                                        customizations.length > 0 &&
                                        customizations.includes(option.item)
                                            ? 'checkbox'
                                            : 'square-outline'
                                    }
                                    size={28}
                                />
                            )}
                            onPress={() => {
                                if (customizations.includes(option.item)) {
                                    setCustomizations(
                                        customizations.filter(
                                            (item) => item !== option.item
                                        )
                                    )
                                } else if (
                                    customizations.length !==
                                    maxSideCustomizations
                                ) {
                                    setCustomizations([
                                        ...customizations,
                                        option.item
                                    ])
                                }
                            }}
                            style={
                                sideCustomizationOptions.indexOf(
                                    option.item
                                ) !==
                                sideCustomizationOptions.length - 1
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
            {sideCustomizationOptions !== null &&
                sideCustomizationOptions.length > 0 &&
                maxSideCustomizations > 1 && (
                    <View>
                        <Button
                            onPress={moveForward}
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

export default SideCustomizations
