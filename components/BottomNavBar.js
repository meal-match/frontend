import Ionicons from '@expo/vector-icons/Ionicons'
import { usePathname, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'react-native-paper'

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
            {tabItems.map((item) => {
                const isSelected =
                    item.route === '/'
                        ? pathname === item.route
                        : pathname.includes(item.route)
                return (
                    <TouchableOpacity
                        key={item.route}
                        onPress={() => router.replace(item.route)}
                        style={styles.navItem}
                        disabled={isSelected}
                    >
                        <Ionicons
                            name={
                                isSelected ? item.icon : `${item.icon}-outline`
                            }
                            size={40}
                            color={
                                isSelected
                                    ? theme.colors.secondaryBold
                                    : theme.colors.secondary
                            }
                        />
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        alignItems: 'top',
        height: 75,
        width: '100%',
        borderTopColor: '#828A8F',
        borderTopWidth: 2,
        backgroundColor: '#F8F8F8'
    },
    navItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    }
})

export default BottomNavBar
