import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { List } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import Page from '@components/Page'
import { setSauce, selectRestaurantData, selectOrder } from '@store'

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

    console.log(sauceOptions)
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
                                sauceOptions.indexOf(option.item) !==
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
                                sauceOptions.indexOf(option.item) !==
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
