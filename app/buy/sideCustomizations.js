import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MultiItemSelector from '@components/MultiItemSelector'
import Page from '@components/Page'
import {
    selectOrder,
    selectRestaurantData,
    setSideCustomizations
} from '@store'

const SideCustomizations = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const [customizations, setCustomizations] = useState([])

    const restaurantData = useSelector(selectRestaurantData)
    const order = useSelector(selectOrder)

    const meal = restaurantData.meals.filter(
        (item) => item.entree === order.entree
    )[0]
    const side = meal?.sides?.filter((item) => item.side === order.side)[0]
    const sideCustomizationOptions = side?.sideCustomizations
    const maxSideCustomizations = side?.maxSideCustomizations

    const moveForward = () => {
        dispatch(setSideCustomizations(customizations))
        router.push('/buy/drinkChoice')
    }

    return (
        <Page header="Customize Side">
            <MultiItemSelector
                items={sideCustomizationOptions}
                maxSelections={maxSideCustomizations}
                values={customizations}
                setValues={setCustomizations}
                moveForward={moveForward}
            />
        </Page>
    )
}

export default SideCustomizations
