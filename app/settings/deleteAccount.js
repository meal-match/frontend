import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Button, HelperText } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'

import Page from '@components/Page'
import {
    deleteProfile,
    selectProfileLoading,
    selectDeleteProfileError
} from '@store'

const DeleteAccount = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const isLoading = useSelector(selectProfileLoading)
    const error = useSelector(selectDeleteProfileError)

    return (
        <Page header="Delete Account" style={styles.page}>
            <Text style={styles.text}>
                Are you sure you want to delete your account?{'\n\n'}This action
                cannot be undone.
            </Text>
            <Button
                mode="contained"
                onPress={() => dispatch(deleteProfile)}
                loading={isLoading}
                disabled={isLoading}
            >
                Delete Account
            </Button>
            <Button mode="outlined" onPress={() => router.back()}>
                Cancel
            </Button>
            {error && (
                <HelperText type="error" style={styles.errorText}>
                    {error}
                </HelperText>
            )}
        </Page>
    )
}

const styles = StyleSheet.create({
    page: {
        paddingLeft: 10,
        paddingRight: 10,
        gap: 20
    },
    text: {
        marginTop: 10,
        marginBottom: 0,
        fontSize: 22,
        textAlign: 'center'
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center'
    }
})

export default DeleteAccount
