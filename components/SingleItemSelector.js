import React from 'react'
import { FlatList } from 'react-native'
import { List } from 'react-native-paper'
import { array, func } from 'prop-types'
import Ionicons from '@expo/vector-icons/Ionicons'

const SingleItemSelector = ({ items, moveForward }) => {
    return (
        <FlatList
            data={items}
            renderItem={(option) => (
                <List.Item
                    title={option.item.name}
                    right={(props) => (
                        <Ionicons
                            {...props}
                            name="chevron-forward-outline"
                            size={28}
                        />
                    )}
                    onPress={() => moveForward(option.item)}
                    style={
                        items.indexOf(option.item) !== items.length - 1
                            ? {
                                  borderBottomColor: '#828A8F',
                                  borderBottomWidth: 1
                              }
                            : {}
                    }
                />
            )}
            keyExtractor={(item) => item.name}
        />
    )
}

SingleItemSelector.propTypes = {
    items: array.isRequired,
    moveForward: func.isRequired
}

export default SingleItemSelector
