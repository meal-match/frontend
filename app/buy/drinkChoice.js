import React from 'react'
import { List } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import { setDrink, selectRestaurantData, selectOrder } from '@store'
import Page from '@components/Page'

const DrinkChoice = () => {
    const dispatch = useDispatch()
    const restaurantData = useSelector(selectRestaurantData)
    const order = useSelector(selectOrder)
    const meal = restaurantData.meals.filter(
        (item) => item.entree === order.entree
    )[0]
    const drinkOptions = meal.drinks
    const router = useRouter()

    const moveForward = (drink) => {
        dispatch(setDrink(drink.drink))
        if (drink.drinkCustomizations.length > 0) {
            router.push('/buy/drinkCustomizations')
        } else if (meal.sauces.length > 0) {
            router.push('/buy/sauceChoice')
        } else {
            router.push('/buy/pickTime')
        }
    }
    return (
        <Page header="Select Drink" style={{ overflow: 'hidden' }}>
            <FlatList
                data={drinkOptions}
                renderItem={(option) => (
                    <List.Item
                        title={option.item.drink}
                        right={(props) => (
                            <Ionicons
                                {...props}
                                name="chevron-forward-outline"
                                size={28}
                            />
                        )}
                        onPress={() => moveForward(option.item)}
                        style={
                            drinkOptions.indexOf(option.item) !==
                            drinkOptions.length - 1
                                ? {
                                      borderBottomColor: '#828A8F',
                                      borderBottomWidth: 1
                                  }
                                : {}
                        }
                    />
                )}
                keyExtractor={(item) => item.drink}
            />
        </Page>
    )
}

export default DrinkChoice
