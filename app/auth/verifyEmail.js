import React, { useEffect, useState } from 'react'
import { HelperText, Text, ActivityIndicator } from 'react-native-paper'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import AuthPage from '@components/AuthPage'
import {
    selectAuthError,
    selectAuthLoading,
    verifyEmail,
    selectVerifyEmail
} from '@store'

const VerifyEmail = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const localSearchParams = useLocalSearchParams()
    const token = localSearchParams.token

    const authError = useSelector(selectAuthError)
    const authLoading = useSelector(selectAuthLoading)
    const emailVerified = useSelector(selectVerifyEmail)

    const [errorText, setErrorText] = useState('')

    useEffect(() => {
        if (!token?.length) {
            setErrorText('Invalid token')
            return
        }
        setErrorText('')
        dispatch(verifyEmail(token))
    }, [token])

    useEffect(() => {
        if (authError.type === 'verifyEmail') {
            setErrorText(authError.message)
        }
    }, [authError])

    if (authLoading) {
        return (
            <AuthPage header="Verify Email">
                <ActivityIndicator size="large" />
            </AuthPage>
        )
    }

    return (
        <AuthPage header="Verify Email">
            {emailVerified && (
                <Text style={{ color: 'green', width: 350 }}>
                    Email verified successfully!
                </Text>
            )}
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

export default VerifyEmail
