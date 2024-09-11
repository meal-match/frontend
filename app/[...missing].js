import React from 'react'
import { useRouter } from 'expo-router'
import { Button } from 'react-native-paper'

import Container from '@components/Container'

const NotFound = () => {
    const router = useRouter()

    return (
        <Container>
            <h3>404 - Page Not Found</h3>
            <Button mode="contained" onPress={() => router.push('/')}>
                Go Home
            </Button>
        </Container>
    )
}

export default NotFound
