import { React, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'expo-router'

import MultiItemSelector from '@components/MultiItemSelector'
import Page from '@components/Page'
import {
    selectRestaurantData,
    selectOrder,
    setEntreeCustomizations
} from '@store'

const EntreeCustomizations = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [customizations, setCustomizations] = useState([])
    const restaurantData = useSelector(selectRestaurantData)
    const order = useSelector(selectOrder)
    const meal = restaurantData.meals?.filter(
        (item) => item.entree === order.entree
    )[0]
    const entreeCustomizationOptions = meal?.entreeCustomizations
    const maxCustomizations = meal?.maxEntreeCustomizations

    const moveForward = () => {
        dispatch(setEntreeCustomizations(customizations))
        router.push('/buy/sideChoice')
    }

    return (
        <Page header="Customize Entree">
            <MultiItemSelector
                items={entreeCustomizationOptions}
                maxSelections={maxCustomizations}
                mealData={customizations}
                setMealData={setCustomizations}
                moveForward={moveForward}
            />
        </Page>
    )
}

export default EntreeCustomizations
