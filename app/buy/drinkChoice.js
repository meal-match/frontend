import { useRouter } from 'expo-router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Page from '@components/Page'
import SingleItemSelector from '@components/SingleItemSelector'
import { selectOrder, selectRestaurantData, setDrink } from '@store'

const DrinkChoice = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const restaurantData = useSelector(selectRestaurantData)
    const order = useSelector(selectOrder)

    const meal = restaurantData.meals.filter(
        (item) => item.entree === order.entree
    )[0]
    const drinkOptions = meal?.drinks || []

    const moveForward = (drink) => {
        dispatch(setDrink(drink.drink))
        if (drink.drinkCustomizations.length > 0) {
            router.push('/buy/drinkCustomizations?step=0')
        } else if (meal.sauces.length > 0) {
            router.push('/buy/sauceChoice')
        } else {
            router.push('/buy/pickTime')
        }
    }
    return (
        <Page header="Select Drink" style={{ overflow: 'hidden' }}>
            <SingleItemSelector
                items={drinkOptions.map((item) => {
                    return { ...item, name: item.drink }
                })}
                moveForward={moveForward}
            />
        </Page>
    )
}

export default DrinkChoice
