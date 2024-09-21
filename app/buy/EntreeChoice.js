import React from 'react'
import Page from '@components/Page'
import { List } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { setEntree } from '@store'
import { useDispatch } from 'react-redux'

const EntreeChoice = () => {
    const entreeOptions = [
        {
            label: 'Chicken Sandwich'
        },
        {
            label: 'Spicy Chicken Sandwich'
        },
        {
            label: 'Chicken Nuggets'
        },
        {
            label: 'Chicken Strips'
        },
        {
            label: 'Chicken Salad'
        }
    ]

    const router = useRouter()
    const dispatch = useDispatch()
    return (
        <Page header="Select Entree">
            <ScrollView style={{ height: '100%' }}>
                {entreeOptions.map((option) => (
                    <List.Item
                        key={option.label}
                        title={option.label}
                        right={(props) => (
                            <Ionicons
                                {...props}
                                name="chevron-forward-outline"
                                size={28}
                            />
                        )}
                        onPress={async () => {
                            await dispatch(setEntree(option.label))
                            router.push('/buy/SideChoice')
                        }}
                        style={
                            entreeOptions.indexOf(option) !==
                            entreeOptions.length - 1
                                ? {
                                      borderBottomColor: '#828A8F',
                                      borderBottomWidth: 1
                                  }
                                : {}
                        }
                    />
                ))}
            </ScrollView>
        </Page>
    )
}

export default EntreeChoice
