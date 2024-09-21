import React, { useState, useEffect, useRef } from 'react'
import { TextInput, HelperText, Button, Checkbox } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    ScrollView
} from 'react-native'

import AuthPage from '@components/AuthPage'
import { createUser } from '@store'
import {} from 'react-native-web'

const CreateAccount = () => {
    const dispatch = useDispatch()

    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [badEmail, setBadEmail] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [passwordRequirements, setPasswordRequirements] = useState([])

    useEffect(() => {
        const emailRegex = /^[\w-\\.]+@crimson.ua.edu$/
        if (email.length > 0 && !emailRegex.test(email)) {
            setBadEmail(true)
        } else {
            setBadEmail(false)
        }
    }, [email])

    useEffect(() => {
        const requirements = []
        if (password.length > 0 && password.length < 8) {
            requirements.push('at least 8 characters')
        }
        setPasswordRequirements(requirements)
    }, [password])

    const onCreatePress = async () => {
        //TODO: form validation
        await dispatch(createUser)
    }

    const scrollViewRef = useRef()

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
                        value={fName}
                        onChangeText={setFName}
                        style={{ width: 350 }}
                    />
                    <TextInput
                        label="Last Name"
                        value={lName}
                        onChangeText={setLName}
                        style={{ width: 350 }}
                    />
                    <TextInput
                        label="Crimson Email"
                        value={email}
                        onChangeText={setEmail}
                        style={{ width: 350 }}
                    />
                    {badEmail && (
                        <HelperText type="error" visible={badEmail}>
                            Email must be your student crimson email address!
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
                    />
                    {passwordRequirements.length > 0 && (
                        <HelperText type="error">
                            {passwordRequirements.join(', ')}
                        </HelperText>
                    )}

                    <Checkbox.Item
                        status={showPassword ? 'checked' : 'unchecked'}
                        label={showPassword ? 'Hide Password' : 'Show Password'}
                        onPress={() => setShowPassword(!showPassword)}
                        position="leading"
                        style={{ width: 350 }}
                        labelStyle={{ textAlign: 'center' }}
                        mode="android"
                    />
                    <Button mode="contained" onPress={onCreatePress}>
                        Create
                    </Button>
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
