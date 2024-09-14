import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { usePathname, useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'

const BottomNavBar = () => {
    const pathname = usePathname()
    const router = useRouter()

    const tabItems = [
        {
            route: '/',
            label: 'Home',
            icon: 'home'
        },
        {
            route: '/buy',
            label: 'Buy',
            icon: 'cart'
        },
        {
            route: '/sell',
            label: 'Sell',
            icon: 'cash'
        },
        {
            route: '/settings',
            label: 'Settings',
            icon: 'settings'
        }
    ]

    return (
        <View style={styles.navbar}>
            {tabItems.map((item) => (
                <TouchableOpacity
                    key={item.route}
                    onPress={() => router.replace(item.route)}
                    style={styles.navItem}
                >
                    <Ionicons
                        name={
                            pathname === item.route
                                ? item.icon
                                : `${item.icon}-outline`
                        }
                        size={24}
                        color={'black'}
                    />
                    <Text
                        style={
                            pathname === item.route
                                ? styles.selectedNavItemText
                                : styles.navItemText
                        }
                    >
                        {item.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        backgroundColor: '#ccc',
        width: '100%',
        paddingBottom: 20
    },
    navItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    navItemText: {
        fontSize: 16
    },
    selectedNavItemText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default BottomNavBar
