import React, { useState } from 'react'
import Page from '@components/Page'
import { List, Button } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import { setSauce, selectRestaurantData, selectOrder } from '@store'
import { useDispatch, useSelector } from 'react-redux'

const SauceChoice = () => {
    const restaurantData = useSelector(selectRestaurantData)
    const order = useSelector(selectOrder)
    const meal = restaurantData.meals.filter(
        (item) => item.entree === order.entree
    )[0]
    const sauceOptions = meal.sauces
    const router = useRouter()
    const dispatch = useDispatch()

    const [customizations, setCustomizations] = useState([])
    const maxSauces = meal.maxSauces

    const moveForward = async () => {
        await dispatch(setSauce(customizations))
        router.push('/buy/pickTime')
    }
    return (
        <Page header="Select Sauce">
            <ScrollView>
                {sauceOptions !== null &&
                    sauceOptions.length > 0 &&
                    maxSauces === 1 &&
                    sauceOptions.map((option) => (
                        <List.Item
                            key={option}
                            title={option}
                            right={(props) => (
                                <Ionicons
                                    {...props}
                                    name="chevron-forward-outline"
                                    size={28}
                                />
                            )}
                            onPress={async () => {
                                setCustomizations([option])
                                moveForward()
                            }}
                            style={
                                sauceOptions.indexOf(option) !==
                                sauceOptions.length - 1
                                    ? {
                                          borderBottomColor: '#828A8F',
                                          borderBottomWidth: 1
                                      }
                                    : {}
                            }
                        />
                    ))}
                {sauceOptions !== null &&
                    maxSauces > 1 &&
                    sauceOptions.length > 0 &&
                    sauceOptions.map((option) => (
                        <List.Item
                            key={option}
                            title={option}
                            right={(props) => (
                                <Ionicons
                                    {...props}
                                    name={
                                        customizations.includes(option)
                                            ? 'checkbox'
                                            : 'square-outline'
                                    }
                                    size={28}
                                />
                            )}
                            onPress={async () => {
                                if (customizations.includes(option)) {
                                    setCustomizations(
                                        customizations.filter(
                                            (item) => item !== option
                                        )
                                    )
                                } else {
                                    setCustomizations([
                                        ...customizations,
                                        option
                                    ])
                                }
                            }}
                            style={
                                sauceOptions.indexOf(option) !==
                                sauceOptions.length - 1
                                    ? {
                                          borderBottomColor: '#828A8F',
                                          borderBottomWidth: 1
                                      }
                                    : {}
                            }
                        />
                    ))}
                {sauceOptions !== null &&
                    sauceOptions.length > 0 &&
                    maxSauces > 1 && (
                        <View>
                            <Button
                                onPress={async () => moveForward()}
                                mode="contained"
                                style={{ margin: 15 }}
                            >
                                Next
                            </Button>
                        </View>
                    )}
            </ScrollView>
        </Page>
    )
}

export default SauceChoice
