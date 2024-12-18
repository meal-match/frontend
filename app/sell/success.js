import React from 'react'
import Page from '@components/Page'
import Divider from '@components/Divider'
import { Text, Button } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from 'expo-router'
import { clearRouterStack } from '@utils'

const Success = () => {
    const navigation = useNavigation()

    const returnHome = () => {
        clearRouterStack('/', navigation)
    }
    return (
        <Page header="Success!">
            <View style={styles.success}>
                <Text style={styles.text}>
                    Thank you for using MealMatch. If there are no buyer
                    complaints in the next two hours, your funds will be
                    released sometime after that.{'\n'}
                </Text>
                <Divider />
                <View style={styles.buttonMenu}>
                    <Button mode="contained" onPress={returnHome}>
                        Return Home
                    </Button>
                </View>
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    success: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        fontSize: 18
    },
    buttonMenu: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10
    }
})

export default Success