import React from 'react'
import { ScrollView, Text, StyleSheet, Image, View } from 'react-native'
import Page from '@components/Page'
import { selectActiveOpenOrder } from '@store'
import { useSelector } from 'react-redux'
import Divider from '@components/Divider'
import { Button } from 'react-native-paper'

const OrderDetails = () => {
    const order = useSelector(selectActiveOpenOrder)

    const buyActionsComponent = (
        <View style={styles.buttonContainer}>
            {order.status === 'Confirmed' && (
                <Button
                    mode="contained"
                    style={styles.footerButton}
                    onPress={() => {}}
                >
                    Report Issue
                </Button>
            )}
            {order.status === 'Pending' && (
                <Button
                    mode="contained"
                    style={styles.footerButton}
                    onPress={() => {}}
                >
                    Cancel Order
                </Button>
            )}
        </View>
    )
    const sellActionsComponent = (
        <View style={styles.buttonContainer}>
            {order.status === 'Confirmed' && (
                <Button
                    mode="contained"
                    style={styles.footerButton}
                    onPress={() => {}}
                >
                    Report Issue
                </Button>
            )}
        </View>
    )

    const content = (
        <ScrollView style={styles.scrollContainer}>
            <View>
                <Text style={styles.text}>
                    <Text style={styles.bold}>Restaurant:</Text>{' '}
                    {order.restaurant}
                    {'\n\n'}
                    <Text style={styles.bold}>Entree: </Text>
                    {order.meal.entree}{' '}
                    {order.meal.entreeCustomizations.length > 0
                        ? `(${order.meal.entreeCustomizations.join(',')})`
                        : ''}
                    {'\n'}
                    <Text style={styles.bold}>Side:</Text> {order.meal.side}{' '}
                    {order.meal.sideCustomizations.length > 0
                        ? `(${order.meal.sideCustomizations.join(',')})`
                        : ''}
                    {'\n'}
                    <Text style={styles.bold}>Drink:</Text> {order.meal.drink}
                    {'\n\n'}
                    <Text style={styles.bold}>Status: </Text>
                    {order.status === 'Confirmed' ? 'Confirmed' : 'Pending'}
                </Text>
                {order.status === 'Confirmed' ? (
                    <>
                        <Text style={styles.text}>
                            <Text
                                style={{
                                    ...styles.text,
                                    ...styles.bold
                                }}
                            >
                                Ready at:{' '}
                            </Text>
                            {order.readyTime}
                        </Text>
                        <Image
                            source={{ uri: order.receiptImage }}
                            style={{
                                width: '100%',
                                height: 400
                            }}
                            resizeMode="contain"
                        />
                    </>
                ) : null}
                <Divider />
                {/* Even though they are very similar, I left them separate because down the road we should make more */}
                {order.type === 'buy'
                    ? buyActionsComponent
                    : sellActionsComponent}
            </View>
        </ScrollView>
    )

    return (
        <Page header={order.meal.entree} style={styles.page}>
            {content}
        </Page>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10
    },
    footerButton: {
        margin: 10
    },
    text: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10
    },
    errorText: {
        fontSize: 18
    },
    page: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    bold: {
        fontWeight: 'bold'
    },
    scrollContainer: {
        flexDirection: 'column',
        flex: 1
    }
})
