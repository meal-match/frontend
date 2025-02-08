import { Link } from 'expo-router'
import { React, useEffect, useState } from 'react'
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import LoadingSpinner from '@components/LoadingSpinner'
import Page from '@components/Page'
import PaymentSetupRedirect from '@components/PaymentSetupRedirect'
import {
    getMealOptions,
    selectMealData,
    selectPaymentMethods,
    selectRestaurantError,
    selectRestaurantLoading,
    setRestaurant,
    setRestaurantData
} from '@store'
import {
    convertTimeToDateObject,
    getCloseTimeFromHoursObject,
    getOpenTimeFromHoursObject
} from '@utils'
import { FilterImage } from 'react-native-svg/filter-image'

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

    const paymentMethods = useSelector(selectPaymentMethods)
    const restaurantError = useSelector(selectRestaurantError)
    const restaurantLoading = useSelector(selectRestaurantLoading)

    const [errorText, setErrorText] = useState('')
    const [options, setOptions] = useState([])
    const [disabledRestaurant, setDisabledRestaurant] = useState(false)

    useEffect(() => {
        dispatch(getMealOptions)
    }, [])

    useEffect(() => {
        setErrorText(restaurantError === null ? '' : restaurantError)
    }, [restaurantError])

    const mealData = useSelector(selectMealData)

    useEffect(() => {
        if (Object.keys(mealData).length > 0) {
            setOptions(
                mealData.restaurants.map((item) => ({
                    label: item.restaurant,
                    image: logos[item.restaurant],
                    hours: item.hours
                }))
            )
        }
    }, [mealData])

    useEffect(() => {
        let tempDisabledRestaurant = false
        if (Object.keys(options).length > 0) {
            for (const option of options) {
                if (isDisabled(option.hours)) {
                    tempDisabledRestaurant = true
                }
            }
        }
        setDisabledRestaurant(tempDisabledRestaurant)
    }, [options])

    const populateRestaurantData = (restaurant) => {
        dispatch(setRestaurant(restaurant))
        dispatch(
            setRestaurantData(
                mealData.restaurants.filter(
                    (item) => item.restaurant === restaurant
                )[0]
            )
        )
    }

    const isDisabled = (hours) => {
        if (!hours) {
            return false
        }

        const closeTimeString = getCloseTimeFromHoursObject(hours)
        const closeTime = convertTimeToDateObject(closeTimeString)

        const disabledTime = closeTime.setMinutes(closeTime.getMinutes() - 30)

        return new Date() > disabledTime
    }

    if (!paymentMethods.length) {
        return <PaymentSetupRedirect type="buy" />
    }

    if (restaurantLoading) {
        return <LoadingSpinner />
    }

    return (
        <Page header="Select Location" style={styles.page}>
            {errorText.length > 0 && <Text>{JSON.stringify(errorText)}</Text>}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {options?.map((option) => (
                    <View key={option.label} style={{ alignItems: 'center' }}>
                        <Link
                            style={styles.locationLink}
                            href={'/buy/entreeChoice'}
                            onPress={(e) => {
                                if (!isDisabled(option.hours)) {
                                    populateRestaurantData(option.label)
                                } else {
                                    e.preventDefault()
                                }
                            }}
                            disabled={isDisabled(option.hours)}
                        >
                            <View style={styles.locationOption}>
                                {isDisabled(option.hours) ? (
                                    <FilterImage
                                        source={option.image}
                                        style={{
                                            ...styles.locationLogo,
                                            filter: 'grayscale(100%)'
                                        }}
                                        resizeMode="contain"
                                    />
                                ) : (
                                    <Image
                                        source={option.image}
                                        style={styles.locationLogo}
                                        resizeMode="contain"
                                    />
                                )}
                            </View>
                        </Link>
                        {option.hours && (
                            <Text style={{ fontSize: 9 }}>
                                Open: {getOpenTimeFromHoursObject(option.hours)}{' '}
                                - {getCloseTimeFromHoursObject(option.hours)}
                            </Text>
                        )}
                    </View>
                ))}
                {disabledRestaurant && (
                    <View style={{ flexBasis: '90%' }}>
                        <Text style={{ color: 'red', textAlign: 'center' }}>
                            Restauraunts that are within 30 minutes of closing
                            are disabled.
                        </Text>
                    </View>
                )}
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
        flex: 0.8
    }
})

export default Buy
