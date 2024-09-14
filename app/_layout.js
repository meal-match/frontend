import React from 'react'
import { Stack } from 'expo-router'
import { DefaultTheme, PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'

import { store } from '@store'

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#9E1B32',
        accent: '#FFFFFF',
        secondary: '#828A8F',
        secondaryBold: '#000000',
        outline: '#000000'
    }
}

const RootLayout = () => {
    return (
        <Provider store={store}>
            <PaperProvider theme={theme}>
                <Stack
                    screenOptions={{
                        headerStyle: { backgroundColor: theme.colors.primary },
                        headerTitle: 'MealMatch',
                        headerTitleStyle: {
                            color: theme.colors.accent,
                            fontSize: 24
                        },
                        headerTintColor: theme.colors.accent,
                        headerBackTitleVisible: false,
                        animation: 'none'
                    }}
                >
                    <Stack.Screen name="index" />
                </Stack>
            </PaperProvider>
        </Provider>
    )
}

export default RootLayout
