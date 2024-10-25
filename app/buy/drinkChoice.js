import React, { useState, useEffect } from 'react'
import Page from '@components/Page'
import { List } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { setDrink, selectRestaurantData, selectOrder } from '@store'
import { useDispatch, useSelector } from 'react-redux'

const DrinkChoice = () => {
    const dispatch = useDispatch()
    const restaurantData = useSelector(selectRestaurantData)
    const order = useSelector(selectOrder)
    const meal = restaurantData.meals.filter(
        (item) => item.entree === order.entree
    )[0]
    const drinkOptions = meal.drinks
    const [drinkList, setDrinkList] = useState([])
    const router = useRouter()

    useEffect(() => {
        if (drinkOptions !== undefined) {
            setDrinkList(
                drinkOptions.map((option) => (
                    <List.Item
                        key={option.drink}
                        title={option.drink}
                        right={(props) => (
                            <Ionicons
                                {...props}
                                name="chevron-forward-outline"
                                size={28}
                            />
                        )}
                        onPress={async () => moveForward(option)}
                        style={
                            drinkOptions.indexOf(option) !==
                            drinkOptions.length - 1
                                ? {
                                      borderBottomColor: '#828A8F',
                                      borderBottomWidth: 1
                                  }
                                : {}
                        }
                    />
                ))
            )
        }
    }, [drinkOptions])

    const moveForward = async (drink) => {
        await dispatch(setDrink(drink.drink))
        if (drink.drinkCustomizations.length > 0) {
            router.push('/buy/drinkCustomizations')
        } else if (meal.sauces.length > 0) {
            router.push('/buy/sauceChoice')
        } else {
            router.push('/buy/pickTime')
        }
    }
    return (
        <Page header="Select Drink">
            <ScrollView>{drinkList}</ScrollView>
        </Page>
    )
}

export default DrinkChoice
