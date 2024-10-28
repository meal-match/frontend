import React from 'react'
import { FlatList } from 'react-native'
import { List } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import Page from '@components/Page'
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

    const moveForward = async (side) => {
        await dispatch(setSide(side.side))
        if (side.sideCustomizations.length > 0) {
            router.push('/buy/sideCustomizations')
        } else {
            router.push('/buy/drinkChoice')
        }
    }
    return (
        <Page header="Select Side">
            <FlatList
                data={sideOptions}
                renderItem={(option) => (
                    <List.Item
                        title={option.item.side}
                        right={(props) => (
                            <Ionicons
                                {...props}
                                name="chevron-forward-outline"
                                size={28}
                            />
                        )}
                        onPress={async () => moveForward(option.item)}
                        style={
                            sideOptions.indexOf(option.item) !==
                            sideOptions.length - 1
                                ? {
                                      borderBottomColor: '#828A8F',
                                      borderBottomWidth: 1
                                  }
                                : {}
                        }
                    />
                )}
            />
        </Page>
    )
}

export default SideChoice
