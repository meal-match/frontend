import React from 'react'
import Page from '@components/Page'
import { List } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import { setDrink } from '@store'
import { useDispatch } from 'react-redux'

const DrinkChoice = () => {
    const drinkOptions = [
        { label: 'Coke' },
        { label: 'Diet Coke' },
        { label: 'Sprite' },
        { label: 'Lemonade' },
        { label: 'Sweet Tea' }
    ]
    const router = useRouter()
    const dispatch = useDispatch()
    return (
        <Page header="Select Drink">
            <ScrollView>
                {drinkOptions.map((option) => (
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
                            await dispatch(setDrink(option.label))
                            router.push('/buy/SauceChoice')
                        }}
                        style={
                            drinkOptions.indexOf(option) !==
                            drinkOptions.length - 1
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

export default DrinkChoice
