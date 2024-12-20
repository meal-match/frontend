import React from 'react'
import { FlatList } from 'react-native'
import { List } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'

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
            title: 'Report an Issue'
        },
        {
            title: 'Questions'
        },
        {
            title: 'About Us'
        },
        {
            title: 'Sign Out',
            onPress: () => {
                dispatch(userLogout)
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
