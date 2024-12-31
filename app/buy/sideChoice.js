import { useRouter } from 'expo-router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Page from '@components/Page'
import SingleItemSelector from '@components/SingleItemSelector'
import { selectOrder, selectRestaurantData, setSide } from '@store'

const SideChoice = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const restaurantData = useSelector(selectRestaurantData)
    const order = useSelector(selectOrder)

    const meal = restaurantData.meals.filter(
        (item) => item.entree === order.entree
    )[0]
    const sideOptions = meal?.sides || []

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
