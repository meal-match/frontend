import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setDrinkCustomizations,
    selectRestaurantData,
    selectOrder
} from '@store'
import { List } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import Page from '@components/Page'

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
                                drinkCustomizationOptions.indexOf(option) !==
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
                                    if (customizations.includes(option)) {
                                        setCustomizations(
                                            customizations.filter(
                                                (item) => item !== option
                                            )
                                        )
                                    } else if (
                                        customizations.length !==
                                        maxDrinkCustomizations
                                    ) {
                                        setCustomizations([
                                            ...customizations,
                                            option
                                        ])
                                    }
                                }
                            }}
                            style={
                                drinkCustomizationOptions.indexOf(option) !==
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
        </Page>
    )
}

export default DrinkCustomizations
