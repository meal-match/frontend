import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter, useLocalSearchParams } from 'expo-router'

import MultiItemSelector from '@components/MultiItemSelector'
import Page from '@components/Page'
import { selectRestaurantData, selectOrder } from '@store'

const DrinkCustomizations = () => {
    //const dispatch = useDispatch()
    const router = useRouter()
    const local = useLocalSearchParams()

    const [customizations, setCustomizations] = useState([])
    const [step, setStep] = useState(local.step ?? 0)

    const restaurantData = useSelector(selectRestaurantData)
    const order = selectOrder()

    const drinkCustomizationOptions = restaurantData.defaultDrinks.filter(
        (item) => item.drink === order.drink
    )[0].drinkCustomizations

    const maxDrinkCustomizations = restaurantData.defaultDrinks.filter(
        (item) => item.drink === order.drink
    )[0].maxDrinkCustomizations

    const moveForward = () => {
        if (drinkCustomizationOptions.length > step + 1) {
            setStep(step + 1)
            router.push(`/buy/drinkCustomizations?step=${step}`)
        } else {
            //dispatch(setDrinkCustomizations(customizations))
            router.push('/buy/pickTime')
        }
    }

    return (
        <Page header={drinkCustomizationOptions[step].title}>
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
