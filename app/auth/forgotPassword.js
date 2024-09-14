import React, { useState } from 'react'
import { Text, TextInput, Button } from 'react-native-paper'
import { useRouter } from 'expo-router'

import AuthPage from '@components/AuthPage'

const ForgotPassword = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')

    const onSubmitPress = () => {
        //TODO: send recovery email
        router.replace('/auth/login')
    }
    return (
        <AuthPage header="Forgot Password">
            <Text style={{ color: 'black' }}>
                Enter your Crimson email address and we&apos;ll send you a link
                to reset your password
            </Text>
            <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{ width: 350 }}
            />
            <Button mode="contained" onPress={onSubmitPress}>
                Submit
            </Button>
            <Text
                style={{ color: 'blue', textDecorationLine: 'underline' }}
                onPress={() => router.push('/auth/login')}
            >
                Back to Login
            </Text>
        </AuthPage>
    )
}

export default ForgotPassword
