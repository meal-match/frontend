import React from 'react'
import { ActivityIndicator } from 'react-native-paper'

import Container from '@components/Container'

const LoadingSpinner = () => {
    return (
        <Container>
            <ActivityIndicator size="large" />
        </Container>
    )
}

export default LoadingSpinner
