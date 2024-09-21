import React from 'react'
import Page from '@components/Page'
import { List } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { setSide } from '@store'
import { useDispatch } from 'react-redux'

const SideChoice = () => {
    const sideOptions = [
        { label: 'Fries' },
        { label: 'Salad' },
        { label: 'Fruit' },
        { label: 'Chips' },
        { label: 'Onion Rings' }
    ]
    const router = useRouter()
    const dispatch = useDispatch()
    return (
        <Page header="Select Side">
            <ScrollView>
                {sideOptions.map((option) => (
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
                            await dispatch(setSide(option.label))
                            router.push('/buy/DrinkChoice')
                        }}
                        style={
                            sideOptions.indexOf(option) !==
                            sideOptions.length - 1
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

export default SideChoice
