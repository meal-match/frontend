import React from 'react'
import Page from '@components/Page'
import { List } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { setSide, selectRestaurantData, selectOrder } from '@store'
import { useDispatch, useSelector } from 'react-redux'

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
            <ScrollView>
                {sideOptions.map((option) => (
                    <List.Item
                        key={option.side}
                        title={option.side}
                        right={(props) => (
                            <Ionicons
                                {...props}
                                name="chevron-forward-outline"
                                size={28}
                            />
                        )}
                        onPress={async () => moveForward(option)}
                        style={
                            sideOptions.indexOf(option) !==
                            sideOptions.length - 1
                                ? {
                                      borderBottomColor: '#828A8F',
                                      borderBottomWidth: 1
                                  }
                                : {}
                        }
                    />
                ))}
            </ScrollView>
        </Page>
    )
}

export default SideChoice
