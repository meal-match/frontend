import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MultiItemSelector from '@components/MultiItemSelector'
import Page from '@components/Page'
import { selectOrder, selectRestaurantData, setSauce } from '@store'

const SauceChoice = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const restaurantData = useSelector(selectRestaurantData)
    const order = useSelector(selectOrder)

    const meal = restaurantData.meals.filter(
        (item) => item.entree === order.entree
    )[0]
    const sauceOptions = meal?.sauces || []
    const maxSauces = meal?.maxSauces

    const [sauces, setSauces] = useState([])

    const moveForward = () => {
        dispatch(setSauce(sauces))
        router.push('/buy/pickTime')
    }

    return (
        <Page header="Select Sauce">
            <MultiItemSelector
                items={sauceOptions}
                maxSelections={maxSauces}
                values={sauces}
                setValues={setSauces}
                moveForward={moveForward}
            />
        </Page>
    )
}

export default SauceChoice
