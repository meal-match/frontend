import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import React from 'react'
import { FlatList, Linking } from 'react-native'
import { List } from 'react-native-paper'
import { useDispatch } from 'react-redux'

import Page from '@components/Page'
import { userLogout } from '@store'

const Settings = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const settingsOptions = [
        {
            title: 'Payment Information',
            onPress: () => {
                router.push({
                    pathname: 'settings/paymentSetup'
                })
            }
        },
        {
            title: 'Payout Information',
            onPress: () => {
                router.push({
                    pathname: 'settings/payoutSetup'
                })
            }
        },
        {
            title: 'Privacy Policy',
            onPress: () => {
                Linking.openURL(process.env.EXPO_PUBLIC_PRIVACY_POLICY_URL)
            }
        },
        {
            title: 'About Us',
            onPress: () => {
                Linking.openURL(process.env.EXPO_PUBLIC_WEBSITE_URL)
            }
        },
        {
            title: 'Sign Out',
            onPress: () => {
                dispatch(userLogout)
            }
        },
        {
            title: 'Delete Account',
            onPress: () => {
                router.push({
                    pathname: 'settings/deleteAccount'
                })
            }
        }
    ]

    return (
        <Page header="Settings">
            <FlatList
                data={settingsOptions}
                renderItem={({ item }) => (
                    <List.Item
                        title={item.title}
                        right={(props) => (
                            <Ionicons
                                {...props}
                                name="chevron-forward-outline"
                                size={28}
                            />
                        )}
                        onPress={item.onPress}
                        style={
                            settingsOptions.indexOf(item) !==
                            settingsOptions.length - 1
                                ? {
                                      borderBottomColor: '#828A8F',
                                      borderBottomWidth: 1
                                  }
                                : {}
                        }
                    />
                )}
                keyExtractor={(item) => item.title}
            />
        </Page>
    )
}

export default Settings
