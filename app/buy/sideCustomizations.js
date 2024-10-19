import React, { useState } from 'react'
import Page from '@components/Page'
import { List, Button } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import {
    setSideCustomizations,
    selectRestaurantData,
    selectOrder
} from '@store'
import { useDispatch, useSelector } from 'react-redux'

const SideCustomizations = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [customizations, setCustomizations] = useState([])
    const restaurantData = useSelector(selectRestaurantData)
    const order = useSelector(selectOrder)

    const sideCustomizationOptions =
        'sides' in
        restaurantData.meals.filter((item) => item.entree === order.entree)[0]
            ? restaurantData.meals
                  .filter((item) => item.entree === order.entree)[0]
                  .sides.filter((item) => item.side === order.side)[0]
                  .sideCustomizations
            : restaurantData.defaultSides.filter(
                  (item) => item.side === order.side
              )[0].sideCustomizations

    const maxSideCustomizations =
        'sides' in
        restaurantData.meals.filter((item) => item.entree === order.entree)[0]
            ? restaurantData.meals
                  .filter((item) => item.entree === order.entree)[0]
                  .sides.filter((item) => item.side === order.side)[0]
                  .maxSideCustomizations
            : (restaurantData.defaultSides.filter(
                  (item) => item.side === order.side
              )[0].maxSideCustomizations ??
              restaurantData.defaultMaxSideCustomizations)

    const moveForward = async () => {
        await dispatch(setSideCustomizations(customizations))
        router.push('/buy/drinkChoice')
    }

    return (
        <Page header="Customize Side">
            <ScrollView style={{ height: '100%' }}>
                {sideCustomizationOptions !== null &&
                    sideCustomizationOptions.length > 0 &&
                    maxSideCustomizations === 1 &&
                    sideCustomizationOptions.map((option) => (
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
                                sideCustomizationOptions.indexOf(option) !==
                                sideCustomizationOptions.length - 1
                                    ? {
                                          borderBottomColor: '#828A8F',
                                          borderBottomWidth: 1
                                      }
                                    : {}
                            }
                        />
                    ))}
                {sideCustomizationOptions !== null &&
                    sideCustomizationOptions.length > 0 &&
                    maxSideCustomizations > 1 &&
                    sideCustomizationOptions.map((option) => (
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
                            onPress={async () => {
                                {
                                    if (customizations.includes(option)) {
                                        setCustomizations(
                                            customizations.filter(
                                                (item) => item !== option
                                            )
                                        )
                                    } else if (
                                        customizations.length !==
                                        maxSideCustomizations
                                    ) {
                                        setCustomizations([
                                            ...customizations,
                                            option
                                        ])
                                    }
                                }
                            }}
                            style={
                                sideCustomizationOptions.indexOf(option) !==
                                sideCustomizationOptions.length - 1
                                    ? {
                                          borderBottomColor: '#828A8F',
                                          borderBottomWidth: 1
                                      }
                                    : {}
                            }
                        />
                    ))}
                {sideCustomizationOptions !== null &&
                    sideCustomizationOptions.length > 0 &&
                    maxSideCustomizations > 1 && (
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

export default SideCustomizations
