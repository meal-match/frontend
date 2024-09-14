import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Link } from 'expo-router'

import Page from '@components/Page'

const Buy = () => {
    const options = [
        {
            label: 'Chick-fil-A'
        },
        {
            label: 'Panda'
        },
        {
            label: 'Dunkin'
        },
        {
            label: "Cane's"
        }
    ]

    return (
        <Page header="Select Location" style={styles.page}>
            {options.map((option) => (
                <Link
                    key={option.label}
                    style={styles.locationLink}
                    href="/buy/test"
                >
                    <View style={styles.locationOption}>
                        <Image
                            // eslint-disable-next-line no-undef
                            source={require('./chick-fil-a-logo.jpg')}
                            style={styles.locationLogo}
                            resizeMode="cover"
                        />
                    </View>
                </Link>
            ))}
        </Page>
    )
}

const styles = StyleSheet.create({
    page: {
        gap: 16,
        flexWrap: 'wrap',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    locationLink: {
        width: '45%',
        borderWidth: 1,
        borderRadius: 8,
        padding: 4
    },
    locationOption: {
        display: 'flex',
        alignItems: 'center',
        padding: 4
    },
    locationLogo: {
        height: 150,
        width: 150
    }
})

export default Buy
