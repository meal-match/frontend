import React, { useState } from 'react'
import { Text, TextInput, Button } from 'react-native-paper'
import { View } from 'react-native'
import { useRouter } from 'expo-router'

import AuthPage from '@components/AuthPage'

const Forgot = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')

    const onSubmitPress = () => {
        //TODO: send recovery email
        router.replace('/auth/login')
    }
    return (
        <AuthPage>
            <View>
                <Text variant="displayMedium" style={{ color: 'black' }}>
                    Forgot Password
                </Text>
                <Text style={{ color: 'black' }}>
                    Enter your email and we&apos;ll send you a link to reset
                    your password
                </Text>
                <TextInput
                    label="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    style={{ width: 350 }}
                />
                <Button mode="contained" onPress={onSubmitPress}>
                    Submit
                </Button>
                <Text
                    style={{ color: 'blue', textDecorationLine: 'underline' }}
                    onPress={() => router.replace('/auth/login')}
                >
                    Back to Login
                </Text>
            </View>
        </AuthPage>
    )
}

export default Forgot
