import Ionicons from '@expo/vector-icons/Ionicons'
import { array, func, number } from 'prop-types'
import React from 'react'
import { FlatList, View } from 'react-native'
import { Button, List } from 'react-native-paper'

const getIconName = (maxSelections, values, item) => {
    if (maxSelections === 1) {
        return 'chevron-forward-outline'
    }
    if (values.includes(item)) {
        return 'checkbox'
    }
    return 'square-outline'
}

const MultiItemSelector = ({
    items,
    maxSelections,
    values,
    setValues,
    moveForward,
    rightIcon = (props, option) => (
        <Ionicons
            {...props}
            name={getIconName(maxSelections, values, option.item)}
            size={28}
        />
    )
}) => {
    return (
        <>
            <FlatList
                data={items}
                renderItem={(option) => (
                    <List.Item
                        key={option.item}
                        title={option.item}
                        right={(props) => rightIcon(props, option)}
                        onPress={() => {
                            if (maxSelections === 1) {
                                setValues([option.item])
                                moveForward()
                            } else if (values.includes(option.item)) {
                                setValues(
                                    values.filter(
                                        (item) => item !== option.item
                                    )
                                )
                            } else if (values.length < maxSelections) {
                                setValues([...values, option.item])
                            }
                        }}
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
            />
            {!!items && items.length > 0 && maxSelections > 1 && (
                <View>
                    <Button
                        onPress={moveForward}
                        mode="contained"
                        style={{ margin: 15 }}
                    >
                        Next
                    </Button>
                </View>
            )}
        </>
    )
}

MultiItemSelector.propTypes = {
    items: array,
    maxSelections: number,
    values: array.isRequired,
    setValues: func.isRequired,
    moveForward: func.isRequired,
    rightIcon: func
}

export default MultiItemSelector
