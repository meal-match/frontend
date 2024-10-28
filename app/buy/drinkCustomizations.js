import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { List, Button } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'

import Page from '@components/Page'
import {
    setDrinkCustomizations,
    selectRestaurantData,
    selectOrder
} from '@store'

const DrinkCustomizations = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [customizations, setCustomizations] = useState([])
    const restaurantData = useSelector(selectRestaurantData)
    const order = selectOrder()
    const drinkCustomizationOptions = restaurantData.defaultDrinks.filter(
        (item) => item.drink === order.drink
    )[0].drinkCustomizations

    const maxDrinkCustomizations =
        restaurantData.defaultDrinks.filter(
            (item) => item.drink === order.drink
        )[0].maxDrinkCustomizations ??
        restaurantData.defaultMaxDrinkCustomizations

    const moveForward = async () => {
        await dispatch(setDrinkCustomizations(customizations))
        router.push('/buy/pickTime')
    }
    return (
        <Page header="Customize Drink">
            <FlatList
                data={drinkCustomizationOptions}
                renderItem={(option) => {
                    maxDrinkCustomizations === 1 ? (
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
                            onPress={async () => {
                                setCustomizations([
                                    ...customizations,
                                    option.item
                                ])
                                moveForward()
                            }}
                            style={
                                drinkCustomizationOptions.indexOf(
                                    option.item
                                ) !==
                                drinkCustomizationOptions.length - 1
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
                                        customizations.includes(option.item)
                                            ? 'checkbox'
                                            : 'square-outline'
                                    }
                                />
                            )}
                            onPress={async () => {
                                {
                                    if (customizations.includes(option.item)) {
                                        setCustomizations(
                                            customizations.filter(
                                                (item) => item !== option.item
                                            )
                                        )
                                    } else if (
                                        customizations.length !==
                                        maxDrinkCustomizations
                                    ) {
                                        setCustomizations([
                                            ...customizations,
                                            option.item
                                        ])
                                    }
                                }
                            }}
                            style={
                                drinkCustomizationOptions.indexOf(
                                    option.item
                                ) !==
                                drinkCustomizationOptions.length - 1
                                    ? {
                                          borderBottomColor: '#828A8F',
                                          borderBottomWidth: 1
                                      }
                                    : {}
                            }
                        />
                    )
                }}
            />
            {drinkCustomizationOptions !== null &&
                drinkCustomizationOptions.length > 0 &&
                maxDrinkCustomizations > 1 && (
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

export default DrinkCustomizations
