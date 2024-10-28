import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { usePathname, useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'

const BottomNavBar = () => {
    const pathname = usePathname()
    const router = useRouter()
    const theme = useTheme()

    const tabItems = [
        {
            route: '/',
            icon: 'home'
        },
        {
            route: '/buy',
            icon: 'cart'
        },
        {
            route: '/sell',
            icon: 'cash'
        },
        {
            route: '/settings',
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
                        size={36}
                        color={
                            pathname === item.route
                                ? theme.colors.secondaryBold
                                : theme.colors.secondary
                        }
                    />
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 72,
        width: '100%',
        borderTopColor: '#828A8F',
        borderTopWidth: 2,
        backgroundColor: '#F8F8F8'
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
