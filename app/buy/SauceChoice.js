import React from 'react'
import Page from '@components/Page'
import { List } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { setSauce } from '@store'
import { useDispatch } from 'react-redux'

const SauceChoice = () => {
    const sauceOptions = [
        { label: 'Ketchup' },
        { label: 'Mustard' },
        { label: 'BBQ' },
        { label: 'Ranch' },
        { label: 'Honey Mustard' }
    ]
    const router = useRouter()
    const dispatch = useDispatch()
    return (
        <Page header="Select Sauce">
            <ScrollView>
                {sauceOptions.map((option) => (
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
                            await dispatch(setSauce(option.label))
                            router.push('/buy/PickTime')
                        }}
                        style={
                            sauceOptions.indexOf(option) !==
                            sauceOptions.length - 1
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

export default SauceChoice
