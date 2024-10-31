import { React, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { List, Button } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'

import Page from '@components/Page'
import {
    selectRestaurantData,
    selectOrder,
    setEntreeCustomizations
} from '@store'

const EntreeCustomizations = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [customizations, setCustomizations] = useState([])
    const restaurantData = useSelector(selectRestaurantData)
    const order = useSelector(selectOrder)
    const meal = restaurantData.meals?.filter(
        (item) => item.entree === order.entree
    )[0]
    const entreeCustomizationOptions = meal?.entreeCustomizations
    const maxCustomizations = meal?.maxEntreeCustomizations

    const moveForward = () => {
        dispatch(setEntreeCustomizations(customizations))
        router.push('/buy/sideChoice')
    }

    return (
        <Page header="Customize Entree">
            <FlatList
                data={entreeCustomizationOptions}
                renderItem={(option) =>
                    maxCustomizations === 1 ? (
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
                            onPress={() => {
                                setCustomizations([
                                    ...customizations,
                                    option.item
                                ])
                                moveForward()
                            }}
                            style={
                                entreeCustomizationOptions.indexOf(
                                    option.item
                                ) !==
                                entreeCustomizationOptions.length - 1
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
                                        customizations.length > 0 &&
                                        customizations.includes(option.item)
                                            ? 'checkbox'
                                            : 'square-outline'
                                    }
                                    size={28}
                                />
                            )}
                            onPress={() => {
                                customizations.length > 0 &&
                                customizations.includes(option.item)
                                    ? setCustomizations(
                                          customizations.filter(
                                              (item) => item !== option.item
                                          )
                                      )
                                    : setCustomizations([
                                          ...customizations,
                                          option.item
                                      ])
                            }}
                            style={
                                entreeCustomizationOptions.indexOf(
                                    option.item
                                ) !==
                                entreeCustomizationOptions.length - 1
                                    ? {
                                          borderBottomColor: '#828A8F',
                                          borderBottomWidth: 1
                                      }
                                    : {}
                            }
                        />
                    )
                }
            />
            {entreeCustomizationOptions?.length > 0 &&
                maxCustomizations > 1 && (
                    <View>
                        <Button
                            onPress={moveForward}
                            mode="contained"
                            style={{ margin: 15 }}
                        >
                            Next
                        </Button>
                    </View>
                )}
        </Page>
    )
}

export default EntreeCustomizations
