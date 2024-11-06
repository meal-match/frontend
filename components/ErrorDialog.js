import React from 'react'
import { Dialog, Portal, Button, Text } from 'react-native-paper'
import { string, func } from 'prop-types'

const ErrorDialog = ({ error, onClose }) => {
    return (
        <Portal>
            <Dialog visible={!!error}>
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Content>
                    <Text>
                        An error occurred: {error}. Please try again later.
                    </Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onClose}>Close</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

ErrorDialog.propTypes = {
    error: string, // not required since usually null
    onClose: func.isRequired
}

export default ErrorDialog
