import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'

import MultiItemSelector from '@components/MultiItemSelector'
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

    const moveForward = () => {
        dispatch(setDrinkCustomizations(customizations))
        router.push('/buy/pickTime')
    }

    return (
        <Page header="Customize Drink">
            <MultiItemSelector
                items={drinkCustomizationOptions}
                maxSelections={maxDrinkCustomizations}
                mealData={customizations}
                setMealData={setCustomizations}
                moveForward={moveForward}
            />
        </Page>
    )
}

export default DrinkCustomizations
