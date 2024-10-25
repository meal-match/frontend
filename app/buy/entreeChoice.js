import { React } from 'react'
import Page from '@components/Page'
import { List } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { setEntree, selectRestaurantData } from '@store'
import { useDispatch, useSelector } from 'react-redux'

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
            <ScrollView style={{ height: '100%' }}>
                {restaurantData !== null &&
                    Object.keys(restaurantData).length > 0 &&
                    restaurantData.meals.map((option) => (
                        <List.Item
                            key={option.entree}
                            title={option.entree}
                            right={(props) => (
                                <Ionicons
                                    {...props}
                                    name="chevron-forward-outline"
                                    size={28}
                                />
                            )}
                            onPress={async () => moveForward(option)}
                            style={
                                restaurantData.meals.indexOf(option) !==
                                restaurantData.meals.length - 1
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

export default EntreeChoice
