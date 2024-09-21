import React, { useEffect, useState } from 'react'
import { HelperText, Text, TextInput, Button } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import AuthPage from '@components/AuthPage'
import { selectAuthError, selectAuthLoading, sendResetEmail } from '@store'

const ForgotPassword = () => {
    const dispatch = useDispatch()

    const router = useRouter()

    const authError = useSelector(selectAuthError)
    const authLoading = useSelector(selectAuthLoading)

    const [email, setEmail] = useState('')
    const [badEmail, setBadEmail] = useState(false)
    const [errorText, setErrorText] = useState('')

    useEffect(() => {
        const emailRegex = /^[\w-\\.]+@crimson.ua.edu$/
        if (email.length > 0 && !emailRegex.test(email)) {
            setBadEmail(true)
        } else {
            setBadEmail(false)
        }
    }, [email])

    const onSubmitPress = () => {
        if (!email.length) {
            setErrorText('Please fill out all fields')
            return
        }
        setErrorText('')
        if (badEmail) {
            return
        }
        dispatch(sendResetEmail(email))
    }

    useEffect(() => {
        if (authError) {
            setErrorText(authError)
        }
    }, [authError])

    return (
        <AuthPage header="Forgot Password">
            <Text style={{ color: 'black', width: 350 }}>
                Enter your Crimson email address and we&apos;ll send you a link
                to reset your password. Note that the link will expire after an
                hour.
            </Text>
            <TextInput
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{ width: 350 }}
            />
            {badEmail && (
                <HelperText type="error" visible={badEmail}>
                    Email must be your student crimson email address!
                </HelperText>
            )}
            <Button
                mode="contained"
                onPress={onSubmitPress}
                disabled={authLoading}
                loading={authLoading}
                style={{ width: 350 }}
            >
                Submit
            </Button>
            {errorText.length > 0 && (
                <HelperText type="error">{errorText}</HelperText>
            )}
            <Text
                style={{ color: 'blue', textDecorationLine: 'underline' }}
                onPress={() => router.replace('/auth/login')}
            >
                Back to Login
            </Text>
        </AuthPage>
    )
}

export default ForgotPassword
