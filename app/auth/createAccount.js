import React, { useState, useEffect, useRef } from 'react'
import {
    TextInput,
    HelperText,
    Button,
    Checkbox,
    Text
} from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'expo-router'
import {
    ScrollView,
    Platform,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native'

import AuthPage from '@components/AuthPage'
import {
    createUser,
    selectAuthLoading,
    selectAuthError,
    selectCreateAccount
} from '@store'
import { checkPasswordRequirements } from '@utils'

const CreateAccount = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const authLoading = useSelector(selectAuthLoading)
    const authError = useSelector(selectAuthError)
    const createAccountSuccess = useSelector(selectCreateAccount)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [badEmail, setBadEmail] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [passwordRequirements, setPasswordRequirements] = useState([])
    const [errorText, setErrorText] = useState('')

    const scrollViewRef = useRef()

    useEffect(() => {
        const emailRegex = /^[^\s@]+$/
        if (email.length > 0 && !emailRegex.test(email)) {
            setBadEmail(true)
        } else {
            setBadEmail(false)
        }
    }, [email])

    useEffect(() => {
        if (password.length) {
            const requirements = checkPasswordRequirements(password)
            setPasswordRequirements(requirements)
        } else {
            setPasswordRequirements([])
        }
    }, [password])

    useEffect(() => {
        if (authError.type === 'createUser') {
            setErrorText(authError.message)
        }
    }, [authError])

    const onCreatePress = async () => {
        if (
            !firstName.length ||
            !lastName.length ||
            !email.length ||
            !password.length
        ) {
            setErrorText('Please fill out all fields')
            return
        }
        setErrorText('')
        if (badEmail || passwordRequirements.length) {
            return
        }

        await dispatch(
            createUser({
                firstName,
                lastName,
                email: email + '@crimson.ua.edu',
                password
            })
        )
    }

    return (
        <AuthPage header="Create Account">
            <KeyboardAvoidingView
                keyboardVerticalOffset={150}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, flexDirection: 'column' }}
                enabled
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    ref={scrollViewRef}
                >
                    <TextInput
                        label="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        style={{ width: 350 }}
                        disabled={authLoading || createAccountSuccess}
                    />
                    <TextInput
                        label="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        style={{ width: 350 }}
                        disabled={authLoading || createAccountSuccess}
                    />
                    <TextInput
                        label="Crimson Email"
                        value={email}
                        onChangeText={setEmail}
                        style={{ width: 350 }}
                        inputMode="email"
                        disabled={authLoading || createAccountSuccess}
                        right={<TextInput.Affix text="@crimson.ua.edu" />}
                    />
                    {badEmail && (
                        <HelperText type="error" visible={badEmail}>
                            Email must be the name of your @crimson.ua.edu email
                            address!
                        </HelperText>
                    )}
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        style={{ width: 350 }}
                        onChange={() =>
                            scrollViewRef.current.scrollToEnd({
                                animated: false
                            })
                        }
                        disabled={authLoading || createAccountSuccess}
                    />
                    {passwordRequirements.length > 0 && (
                        <HelperText type="error">
                            {passwordRequirements.join('\n')}
                        </HelperText>
                    )}
                    <Checkbox.Item
                        status={showPassword ? 'checked' : 'unchecked'}
                        label={showPassword ? 'Hide Password' : 'Show Password'}
                        onPress={() => setShowPassword(!showPassword)}
                        position="leading"
                        style={{ width: 350 }}
                        mode="android"
                        labelStyle={{ textAlign: 'center' }}
                    />
                    <Button
                        mode="contained"
                        onPress={onCreatePress}
                        loading={authLoading}
                        disabled={authLoading || createAccountSuccess}
                        style={{ width: 350 }}
                    >
                        Create
                    </Button>
                    {errorText.length > 0 && (
                        <HelperText type="error">{errorText}</HelperText>
                    )}
                    {createAccountSuccess && (
                        <Text style={{ color: 'green', width: 350 }}>
                            Account created successfully! We have emailed you a
                            link to verify your email. Once you have verified
                            your email, you can login.
                        </Text>
                    )}
                    <Text
                        style={{
                            color: 'blue',
                            textDecorationLine: 'underline'
                        }}
                        onPress={() => router.replace('/auth/login')}
                    >
                        Back to Login
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </AuthPage>
    )
}

const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center'
    }
})

export default CreateAccount
