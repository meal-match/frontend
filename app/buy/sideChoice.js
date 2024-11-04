import React from 'react'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import Page from '@components/Page'
import SingleItemSelector from '@components/SingleItemSelector'
import { setSide, selectRestaurantData, selectOrder } from '@store'

const SideChoice = () => {
    const dispatch = useDispatch()

    const restaurantData = useSelector(selectRestaurantData)
    const order = useSelector(selectOrder)
    const meal = restaurantData.meals.filter(
        (item) => item.entree === order.entree
    )[0]
    const sideOptions = meal.sides

    const router = useRouter()

    const moveForward = (side) => {
        dispatch(setSide(side.side))
        if (side.sideCustomizations.length > 0) {
            router.push('/buy/sideCustomizations')
        } else {
            router.push('/buy/drinkChoice')
        }
    }
    return (
        <Page header="Select Side">
            <SingleItemSelector
                items={sideOptions.map((item) => {
                    return { ...item, name: item.side }
                })}
                moveForward={moveForward}
            />
        </Page>
    )
}

export default SideChoice
