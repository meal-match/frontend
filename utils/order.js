import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export const formatOrderFull = (order) => {
    return (
        <>
            <Text style={styles.bold}>Entree:</Text> {order.entree}
            {order.entreeCustomizations.length > 0
                ? ` (${order.entreeCustomizations.join(', ')})`
                : ' '}
            {'\n'}
            <Text style={styles.bold}>Side:</Text> {order.side}
            {order.sideCustomizations.length > 0
                ? ` (${order.sideCustomizations.join(', ')})`
                : ' '}
            {'\n'}
            <Text style={styles.bold}>Drink:</Text> {order.drink}
            {'\n'}
            {Object.keys(order.drinkCustomizations).length > 0 && (
                <View style={styles.subText}>
                    {Object.keys(order.drinkCustomizations).map((key) => (
                        <Text key={key}>
                            <Text style={styles.bold}>{key}: </Text>
                            {order.drinkCustomizations[key].join(', ')}
                        </Text>
                    ))}
                </View>
            )}
            {'\n'}
            {order.sauces?.length > 0 && `Sauce: ${order.sauces.join(', ')}`}
            {'\n'}
        </>
    )
}

const styles = StyleSheet.create({
    bold: {
        fontWeight: 'bold'
    },
    subText: {
        paddingLeft: 10
    }
})
