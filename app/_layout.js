import React from 'react'
import { Stack } from 'expo-router'
import { PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'

import { store } from '@store'

const RootLayout = () => {
    return (
        <Provider store={store}>
            <PaperProvider>
                <Stack
                    screenOptions={{ headerShown: false, animation: 'none' }}
                >
                    <Stack.Screen name="index" />
                </Stack>
            </PaperProvider>
        </Provider>
    )
}

export default RootLayout
