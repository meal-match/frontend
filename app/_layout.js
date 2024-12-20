import React, { useEffect, useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import { DefaultTheme, PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import * as Linking from 'expo-linking'

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
    const router = useRouter()

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        const handleDeepLink = (event) => {
            const data = Linking.parse(event.url)
            const params = data.queryParams

            if (isMounted) {
                router.push({
                    pathname: data.path,
                    params
                })
            }
        }

        const subscription = Linking.addEventListener('url', handleDeepLink)
        setIsMounted(true)
        return () => subscription.remove()
    }, [])

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
                        headerBackButtonDisplayMode: 'minimal',
                        animation: 'none'
                    }}
                >
                    <Stack.Screen name="index" />
                    <Stack.Screen
                        name="buy/entreeChoice"
                        options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                        name="buy/entreeCustomizations"
                        options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                        name="buy/sideChoice"
                        options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                        name="buy/sideCustomizations"
                        options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                        name="buy/drinkChoice"
                        options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                        name="buy/sauceChoice"
                        options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                        name="buy/pickTime"
                        options={{ animation: 'slide_from_right' }}
                    />
                    <Stack.Screen
                        name="buy/orderPlaced"
                        options={{ animation: 'slide_from_right' }}
                    />
                </Stack>
            </PaperProvider>
        </Provider>
    )
}

export default RootLayout
