import React, { useState } from 'react'
import Page from '@components/Page'
import { List } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { setSauce, selectRestaurantData, selectOrder } from '@store'
import { useDispatch, useSelector } from 'react-redux'
import { FlatList } from 'react-native-web'

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
            <FlatList
                data={sauceOptions}
                renderItem={(option) => {
                    maxSauces === 1 ? (
                        <List.Item
                            key={option.item}
                            title={option.item}
                            right={(props) => (
                                <Ionicons
                                    {...props}
                                    name="chevron-forward-outline"
                                    size={28}
                                />
                            )}
                            onPress={async () => {
                                setCustomizations([option.item])
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
                    ) : (
                        <List.Item
                            key={option.item}
                            title={option.item}
                            right={(props) => (
                                <Ionicons
                                    {...props}
                                    name={
                                        customizations.includes(option.item)
                                            ? 'checkbox'
                                            : 'square-outline'
                                    }
                                    size={28}
                                />
                            )}
                            onPress={async () => {
                                if (customizations.includes(option.item)) {
                                    setCustomizations(
                                        customizations.filter(
                                            (item) => item !== option.item
                                        )
                                    )
                                } else {
                                    setCustomizations([
                                        ...customizations,
                                        option.item
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
                    )
                }}
            />
        </Page>
    )
}

export default SauceChoice
