import { React } from 'react'
import { FlatList } from 'react-native'
import { List } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import Page from '@components/Page'
import { setEntree, selectRestaurantData } from '@store'

const EntreeChoice = () => {
    const dispatch = useDispatch()

    const restaurantData = useSelector(selectRestaurantData)

    const router = useRouter()

    const moveForward = async (meal) => {
        await dispatch(setEntree(meal.entree))
        if (meal.entreeCustomizations.length > 0) {
            router.push('/buy/entreeCustomizations')
        } else {
            router.push('/buy/sideChoice')
        }
    }

    return (
        <Page header="Select Entree">
            <FlatList
                data={restaurantData.meals}
                renderItem={(option) => (
                    <List.Item
                        title={option.item.entree}
                        right={(props) => (
                            <Ionicons
                                {...props}
                                name="chevron-forward-outline"
                                size={28}
                            />
                        )}
                        onPress={async () => moveForward(option.item)}
                        style={
                            restaurantData.meals.indexOf(option.item) !==
                            restaurantData.meals.length - 1
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

export default EntreeChoice
