import { React, useState } from 'react'
import Page from '@components/Page'
import { useSelector, useDispatch } from 'react-redux'
import {
    selectRestaurantData,
    selectOrder,
    setEntreeCustomizations
} from '@store'
import { List } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { FlatList } from 'react-native-web'

const EntreeCustomizations = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [customizations, setCustomizations] = useState([])
    const restaurantData = useSelector(selectRestaurantData)
    const order = useSelector(selectOrder)
    const meal = restaurantData.meals.filter(
        (item) => item.entree === order.entree
    )[0]
    const entreeCustomizationOptions = meal.entreeCustomizations
    const maxCustomizations = meal.maxEntreeCustomizations

    const moveForward = async () => {
        await dispatch(setEntreeCustomizations(customizations))
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
                            onPress={async () => {
                                setCustomizations([
                                    ...customizations,
                                    option.item
                                ])
                                moveForward()
                            }}
                            style={
                                entreeCustomizationOptions.indexOf(option) !==
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
                                entreeCustomizationOptions.indexOf(option) !==
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
            {/* <ScrollView style={{ height: '100%' }}>
                {entreeCustomizationOptions !== null &&
                    entreeCustomizationOptions.length > 0 &&
                    maxCustomizations === 1 &&
                    entreeCustomizationOptions.map((option) => (
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
                                setCustomizations([...customizations, option])
                                moveForward()
                            }}
                            style={
                                entreeCustomizationOptions.indexOf(option) !==
                                entreeCustomizationOptions.length - 1
                                    ? {
                                          borderBottomColor: '#828A8F',
                                          borderBottomWidth: 1
                                      }
                                    : {}
                            }
                        />
                    ))}
                {entreeCustomizationOptions !== null &&
                    entreeCustomizationOptions.length > 0 &&
                    maxCustomizations > 1 &&
                    entreeCustomizationOptions.map((option) => (
                        <List.Item
                            key={option}
                            title={option}
                            right={(props) => (
                                <Ionicons
                                    {...props}
                                    name={
                                        customizations.length > 0 &&
                                        customizations.includes(option)
                                            ? 'checkbox'
                                            : 'square-outline'
                                    }
                                    size={28}
                                />
                            )}
                            onPress={() => {
                                customizations.length > 0 &&
                                customizations.includes(option)
                                    ? setCustomizations(
                                          customizations.filter(
                                              (item) => item !== option
                                          )
                                      )
                                    : setCustomizations([
                                          ...customizations,
                                          option
                                      ])
                            }}
                            style={
                                entreeCustomizationOptions.indexOf(option) !==
                                entreeCustomizationOptions.length - 1
                                    ? {
                                          borderBottomColor: '#828A8F',
                                          borderBottomWidth: 1
                                      }
                                    : {}
                            }
                        />
                    ))}
                {entreeCustomizationOptions !== null &&
                    entreeCustomizationOptions.length > 0 &&
                    maxCustomizations > 1 && (
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
            </ScrollView> */}
        </Page>
    )
}

export default EntreeCustomizations
