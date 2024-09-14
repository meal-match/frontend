import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { Button } from 'react-native-paper'

import Container from '@components/Container'

const NotFound = () => {
    const router = useRouter()

    return (
        <Container>
            <Text style={styles.headerText}>404 - Page Not Found</Text>
            <Button mode="contained" onPress={() => router.replace('/')}>
                Go Home
            </Button>
        </Container>
    )
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    }
})

export default NotFound
