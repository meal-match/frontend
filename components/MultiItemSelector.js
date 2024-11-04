import React from 'react'
import { FlatList, View } from 'react-native'
import { List, Button } from 'react-native-paper'
import { array, func, number } from 'prop-types'
import Ionicons from '@expo/vector-icons/Ionicons'

const MultiItemSelector = ({
    items,
    maxSelections,
    mealData,
    setMealData,
    moveForward
}) => {
    return (
        <>
            <FlatList
                data={items}
                renderItem={(option) => {
                    return maxSelections === 1 ? (
                        <List.Item
                            key={option.item}
                            title={option.item}
                            right={(props) => (
                                <Ionicons
                                    {...props}
                                    name="chevron-forward-outline"
                                    size={28}
                                />
                            )}
                            onPress={() => {
                                setMealData([...mealData, option.item])
                                moveForward()
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
                    ) : (
                        <List.Item
                            key={option.item}
                            title={option.item}
                            right={(props) => (
                                <Ionicons
                                    {...props}
                                    name={
                                        mealData.includes(option.item)
                                            ? 'checkbox'
                                            : 'square-outline'
                                    }
                                    size={28}
                                />
                            )}
                            onPress={() => {
                                if (mealData.includes(option.item)) {
                                    setMealData(
                                        mealData.filter(
                                            (item) => item !== option.item
                                        )
                                    )
                                } else if (mealData.length < maxSelections) {
                                    setMealData([...mealData, option.item])
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
                    )
                }}
            />
            {items !== null && items.length > 0 && maxSelections > 1 && (
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
    items: array.isRequired,
    maxSelections: number.isRequired,
    mealData: array.isRequired,
    setMealData: func.isRequired,
    moveForward: func.isRequired
}

export default MultiItemSelector
