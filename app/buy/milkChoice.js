import React from 'react'
import Page from '@components/Page'
import SingleItemSelector from '@components/SingleItemSelector'
import { router } from 'expo-router'
import { useSelector } from 'react-redux'
import { selectRestaurantData, selectOrder } from '@store'

const milkChoice = () => {
    const restaurantData = useSelector(selectRestaurantData)
    const order = useSelector(selectOrder)

    const meal = restaurantData.meals.filter(
        (item) => item.entree === order.entree
    )[0]

    const moveForward = (sweetener) => {
        // do something with sweetener
        const something = { sweetener, something } // just to make eslint happy
        if (meal.sauces.length > 0) {
            router.push('/buy/sauceChoice')
        } else {
            router.push('/buy/pickTime')
        }
    }
    return (
        <Page header="Choose Sweetener">
            <SingleItemSelector
                items={[
                    { name: 'Milk' },
                    { name: 'Honey' },
                    { name: 'Stevia' },
                    { name: 'Splenda' },
                    { name: 'Equal' },
                    { name: 'Sweet N Low' },
                    { name: 'No Sweetener' }
                ]}
                moveForward={moveForward}
            />
        </Page>
    )
}

export default milkChoice
