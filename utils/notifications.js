import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'

export const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()

    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
    }
    if (finalStatus !== 'granted') {
        return
    }

    const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId
    if (!projectId) {
        throw new Error('Projeet ID not found')
    }

    return (
        await Notifications.getExpoPushTokenAsync({
            projectId
        })
    ).data
}
