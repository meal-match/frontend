import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    setDrinkCustomizations,
    selectRestaurantData,
    selectOrder
} from '@store'
import { List, Button } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ScrollView, View } from 'react-native'
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
            <ScrollView style={{ height: '100%' }}>
                {drinkCustomizationOptions !== null &&
                    drinkCustomizationOptions.length > 0 &&
                    maxDrinkCustomizations === 1 &&
                    drinkCustomizationOptions.map((option) => (
                        <List.Item
                            key={option}
                            title={option}
                            right={(props) => (
                                <Ionicons
                                    {...props}
                                    name="chevron-forward-outline"
                                    size={28}
                                />
                            )}
                            onPress={async () => {
                                setCustomizations([...customizations, option])
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
                    ))}
                {drinkCustomizationOptions !== null &&
                    drinkCustomizationOptions.length > 0 &&
                    maxDrinkCustomizations > 1 &&
                    drinkCustomizationOptions.map((option) => (
                        <List.Item
                            key={option}
                            title={option}
                            right={(props) => (
                                <Ionicons
                                    {...props}
                                    name="chevron-forward-outline"
                                    size={28}
                                />
                            )}
                            onPress={async () => {
                                setCustomizations([...customizations, option])
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
                    ))}
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
            </ScrollView>
        </Page>
    )
}

export default DrinkCustomizations
