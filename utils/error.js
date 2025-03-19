import { Alert } from 'react-native'

export const displayError = (error, onClose, message = 'An error occurred') => {
    if (error) {
        Alert.alert(
            'Error',
            `${message}: ${error}\n\nPlease try again later.`,
            [
                {
                    text: 'Close',
                    onPress: onClose
                }
            ]
        )
    }
}
