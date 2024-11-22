import { React } from 'react'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import Page from '@components/Page'
import SingleItemSelector from '@components/SingleItemSelector'
import { setEntree, selectRestaurantData } from '@store'

const EntreeChoice = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const restaurantData = useSelector(selectRestaurantData)

    const moveForward = (meal) => {
        dispatch(setEntree(meal.entree))
        if (meal.entreeCustomizations.length > 0) {
            router.push('/buy/entreeCustomizations')
        } else {
            router.push('/buy/sideChoice')
        }
    }

    return (
        <Page header="Select Entree">
            <SingleItemSelector
                items={restaurantData.meals?.map((item) => {
                    return { ...item, name: item.entree }
                })}
                moveForward={moveForward}
            />
        </Page>
    )
}

export default EntreeChoice
