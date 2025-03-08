import { useRouter, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import MultiItemSelector from '@components/MultiItemSelector'
import Page from '@components/Page'
import {
    selectOrder,
    selectRestaurantData,
    addDrinkCustomizations
} from '@store'

const DrinkCustomizations = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const local = useLocalSearchParams()

    const [customizations, setCustomizations] = useState([])
    const [step] = useState(Number(local.step) || 0)

    const restaurantData = useSelector(selectRestaurantData)
    const order = useSelector(selectOrder)

    const meal = restaurantData.meals.filter(
        (item) => item.entree === order.entree
    )[0]

    const drinkObject = meal.drinks.filter(
        (item) => item.drink === order.drink
    )[0]
    const drinkCustomizationOptions = drinkObject
        ? drinkObject.drinkCustomizations
        : []
    const maxDrinkCustomizations =
        drinkObject.maxDrinkCustomizations === 0
            ? drinkCustomizationOptions.length
            : drinkObject.maxDrinkCustomizations

    const moveForward = () => {
        dispatch(
            addDrinkCustomizations({
                key: drinkCustomizationOptions[step].title,
                value: customizations
            })
        )

        if (drinkCustomizationOptions.length > step + 1) {
            router.push(`/buy/drinkCustomizations?step=${step + 1}`)
        } else {
            router.push('/buy/pickTime')
        }
    }

    return (
        <Page header={`Select ${drinkCustomizationOptions[step].title}`}>
            <MultiItemSelector
                items={drinkCustomizationOptions[step].data}
                maxSelections={maxDrinkCustomizations}
                values={customizations}
                setValues={setCustomizations}
                moveForward={moveForward}
            />
        </Page>
    )
}

export default DrinkCustomizations
