import { React, useEffect } from 'react'
import { Image, StyleSheet, View, Dimensions, ScrollView } from 'react-native'
import { Link } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import {
    getMealOptions,
    setRestaurant,
    setRestaurantData,
    selectMealData
} from '@store'

import Page from '@components/Page'

const { width: screenWidth } = Dimensions.get('window')

const Buy = () => {
    const logos = {
        'Chick-Fil-A': require('@assets/images/logos/Chick-Fil-A.png'),
        'Panda Express': require('@assets/images/logos/Panda Express.png'),
        "Raising Cane's": require("@assets/images/logos/Raising Cane's.png"),
        "Dunkin' Donuts": require("@assets/images/logos/Dunkin' Donuts.png"),
        "Julia's Market": require("@assets/images/logos/Julia's Market.png"),
        'Presidential Village': require('@assets/images/logos/Presidential Village.png'),
        "Wendy's": require("@assets/images/logos/Wendy's.png")
    }
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMealOptions)
    }, [])

    const mealData = useSelector(selectMealData)

    const options = mealData.map((item) => ({
        label: item.restaurant,
        image: logos[item.restaurant]
    }))

    const populateRestaurantData = (restaurant) => {
        dispatch(setRestaurant(restaurant))
        dispatch(
            setRestaurantData(
                mealData.filter((item) => item.restaurant === restaurant)[0]
            )
        )
    }

    return (
        <Page header="Select Location" style={styles.page}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {options !== null &&
                    options.map((option) => (
                        <Link
                            key={option.label}
                            style={styles.locationLink}
                            href={'/buy/entreeChoice'}
                            onPress={async () => {
                                populateRestaurantData(option.label)
                            }}
                        >
                            <View style={styles.locationOption}>
                                <Image
                                    source={option.image}
                                    style={styles.locationLogo}
                                    resizeMode="contain"
                                />
                            </View>
                        </Link>
                    ))}
            </ScrollView>
        </Page>
    )
}

const styles = StyleSheet.create({
    page: {
        headerTitleAlign: 'left',
        flex: 1
    },
    scrollContainer: {
        flexGrow: 1, // Allow the content to grow and be scrollable
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: (screenWidth * 0.1) / 3,
        paddingBottom: screenWidth * 0.075,
        gap: (screenWidth * 0.1) / 3 // Optional: padding around the content
    },
    locationLink: {
        width: screenWidth * 0.45,
        height: screenWidth * 0.45,
        borderWidth: 1,
        borderRadius: 20,
        overflow: 'hidden',
        padding: 4,
        backgroundColor: '#FFFFFF'
    },
    locationOption: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    },
    locationLogo: {
        flex: 0.8,
        marginLeft: '7%',
        marginTop: '7%'
    }
})

export default Buy
