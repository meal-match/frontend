import React from 'react'
import { Image, StyleSheet, View, Dimensions, ScrollView } from 'react-native'
import { Link } from 'expo-router'

import Page from '@components/Page'

const { width: screenWidth } = Dimensions.get('window')

const Buy = () => {
    const options = [
        {
            label: 'Chick-fil-A',
            image: require('@assets/images/logos/chick.png')
        },
        {
            label: 'Panda',
            image: require('@assets/images/logos/panda.png')
        },
        {
            label: 'Dunkin',
            image: require('@assets/images/logos/dunkin.png')
        },
        {
            label: 'Canes',
            image: require('@assets/images/logos/canes.png')
        },
        {
            label: 'Pres-Deli',
            image: require('@assets/images/logos/pres.png')
        },
        {
            label: 'Julias',
            image: require('@assets/images/logos/julia.png')
        },
        {
            label: "Wendy's",
            image: require('@assets/images/logos/wendy.png')
        }
    ]

    return (
        <Page header="Select Location" style={styles.page}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {options.map((option) => (
                    // <View style={styles.location} key={option.label}>
                    <Link
                        key={option.label}
                        style={styles.locationLink}
                        href="/buy/test"
                    >
                        <View style={styles.locationOption}>
                            <Image
                                source={option.image}
                                style={styles.locationLogo}
                                resizeMode="contain"
                            />
                        </View>
                    </Link>
                    // </View>
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
