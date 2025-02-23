import { useNavigation } from 'expo-router'
import React, { Fragment, useEffect, useState, useRef } from 'react'
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'

import Divider from '@components/Divider'
import ErrorDialog from '@components/ErrorDialog'
import LoadingSpinner from '@components/LoadingSpinner'
import Page from '@components/Page'
import {
    confirmOrder,
    resetClaimOrderError,
    selectClaimedOrder,
    selectClaimedOrderError,
    selectClaimedOrderLoading,
    selectOrderConfirmed,
    setReceiptUri as setReceiptUriAction,
    setWaitTime,
    unclaimOrder,
    selectTargetTime,
    setTargetTime,
    resetTargetTime,
    setOrderExpired
} from '@store'
import { clearRouterStack, formatTimeWithIntl } from '@utils'
import * as ImagePicker from 'expo-image-picker'

const OrderDetails = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const orderData = useSelector(selectClaimedOrder)
    const claimedOrderError = useSelector(selectClaimedOrderError)
    const claimedOrderLoading = useSelector(selectClaimedOrderLoading)
    const orderConfirmed = useSelector(selectOrderConfirmed)
    const targetTime = useSelector(selectTargetTime)

    const [receiptUri, setReceiptUri] = useState(null)
    const [orderDetailsError, setOrderDetailsError] =
        useState(claimedOrderError)
    const [estimatedWaitTime, setEstimatedWaitTime] = useState(0)
    const [seconds, setSeconds] = useState(() => {
        if (targetTime) {
            const now = new Date()
            const diff = new Date(targetTime) - now
            return Math.max(Math.floor(diff / 1000), 0)
        }
        return 7 * 60 // sets a seven minute timer
    })
    const targetTimeRef = useRef(null)

    const onUnclaimPress = () => {
        dispatch(unclaimOrder)
        dispatch(resetTargetTime)
    }

    const onConfirmPress = () => {
        dispatch(confirmOrder)
    }

    useEffect(() => {
        setOrderDetailsError(claimedOrderError)
    }, [claimedOrderError])

    useEffect(() => {
        if (estimatedWaitTime !== 0) {
            dispatch(setWaitTime(estimatedWaitTime))
        }
    }, [estimatedWaitTime])

    useEffect(() => {
        if (receiptUri) {
            dispatch(setReceiptUriAction(receiptUri))
        }
    }, [receiptUri])

    useEffect(() => {
        if (orderConfirmed) {
            clearRouterStack('/sell/success', navigation)
        }
    }, [orderConfirmed])

    useEffect(() => {
        if (!orderData) {
            clearRouterStack('/sell/index', navigation)
        }
    }, [orderData])

    useEffect(() => {
        if (targetTime) {
            targetTimeRef.current = targetTime
        } else {
            const now = new Date()
            const newTargetTime = new Date(now.getTime() + 7 * 60 * 1000) // 7 minutes from now
            targetTimeRef.current = newTargetTime // Update the ref immediately
            dispatch(setTargetTime(newTargetTime)) // Update the store after the ref is updated
        }

        const interval = setInterval(() => {
            const now = new Date()
            const diff = targetTimeRef.current - now // Use the ref value
            if (diff > 0) {
                setSeconds(Math.floor(diff / 1000))
            } else {
                setSeconds(0) // Stop the timer when the target time is reached
                clearInterval(interval)
                clearRouterStack('/', navigation)
                Alert.alert('Order has expired', 'Please claim another order')
                dispatch(resetTargetTime)
                dispatch(setOrderExpired(true))
            }
        }, 1000)

        return () => clearInterval(interval) // Cleanup interval on unmount
    }, [targetTime])

    if (claimedOrderLoading) {
        return <LoadingSpinner />
    }

    const uploadImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: false,
                quality: 1
            })
            if (!result.canceled) {
                setReceiptUri(result.assets[0].uri)
            }
        } catch (error) {
            setOrderDetailsError(error)
        }
    }

    return (
        <Page header="Order Details">
            {orderData && (
                <>
                    <View
                        style={{ alignContent: 'center', alignItems: 'center' }}
                    >
                        <Text style={{ ...styles.text, color: 'red' }}>
                            {Math.floor(seconds / 60)}:
                            {seconds % 60 < 10
                                ? '0' + (seconds % 60)
                                : seconds % 60}
                        </Text>
                    </View>
                    <Divider />
                    <ScrollView>
                        <View style={styles.orderDetails}>
                            <Text style={styles.text}>
                                Restaurant: {orderData?.restaurant}
                                {'\n'}
                            </Text>
                            {Object.keys(orderData?.meal).map((key) => {
                                if (
                                    (Array.isArray(orderData?.meal[key]) &&
                                        !orderData.meal[key].length) ||
                                    key === '_id'
                                ) {
                                    return <Fragment key={key} />
                                }
                                let label = key.replace(/([A-Z])/g, ' $1')
                                label =
                                    label.charAt(0).toUpperCase() +
                                    label.slice(1)
                                return (
                                    <Text key={key} style={styles.text}>
                                        {label}:{' '}
                                        {Array.isArray(orderData.meal[key])
                                            ? orderData.meal[key].join(', ')
                                            : orderData.meal[key]}
                                    </Text>
                                )
                            })}
                            <Text style={styles.text}>
                                {'\n'}
                                Desired Pickup Time:{' '}
                                {formatTimeWithIntl(
                                    orderData.desiredPickupTime
                                )}
                            </Text>
                        </View>
                        <Divider />
                        <View style={styles.orderDetails}>
                            <View style={styles.estimatedWaitTime}>
                                <Text style={styles.text}>
                                    Estimated Wait Time:{' '}
                                </Text>
                                <TextInput
                                    keyboardType="numeric"
                                    returnKeyType="done"
                                    style={{ width: 50, height: 40 }}
                                    value={
                                        estimatedWaitTime === 0
                                            ? ''
                                            : estimatedWaitTime.toString()
                                    }
                                    onChangeText={(text) => {
                                        if (text !== '' && Number(text) < 100) {
                                            setEstimatedWaitTime(Number(text))
                                        } else if (text === '') {
                                            setEstimatedWaitTime(0)
                                        }
                                    }}
                                />
                                <Text style={styles.text}> min</Text>
                            </View>
                            <Text style={styles.text}>
                                {'\n'}
                                Upload a screenshot of receipt from Bama Dining
                            </Text>
                            <View style={styles.inlineButtonContainer}>
                                <View style={styles.uploadConfirmButtons}>
                                    <TouchableOpacity
                                        onPress={uploadImage}
                                        style={
                                            receiptUri
                                                ? styles.reactNativePaperOutlined
                                                : styles.reactNativePaperContained
                                        }
                                    >
                                        <Text
                                            style={
                                                receiptUri
                                                    ? styles.reactNativePaperOutlinedText
                                                    : styles.reactNativePaperContainedText
                                            }
                                        >
                                            Upload
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={onConfirmPress}
                                        disabled={
                                            receiptUri === null ||
                                            estimatedWaitTime === 0
                                        }
                                        style={
                                            receiptUri &&
                                            estimatedWaitTime !== 0
                                                ? styles.reactNativePaperContained
                                                : styles.reactNativePaperDisabled
                                        }
                                    >
                                        <Text
                                            style={
                                                receiptUri &&
                                                estimatedWaitTime !== 0
                                                    ? styles.reactNativePaperContainedText
                                                    : styles.reactNativePaperDisabledText
                                            }
                                        >
                                            Confirm
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.receiptPreviewContainer}>
                                    {receiptUri && (
                                        <Image
                                            source={{ uri: receiptUri }}
                                            style={styles.receiptPreviewImage}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.buttonMenu}>
                            <Button mode="outlined" onPress={onUnclaimPress}>
                                Unclaim Order
                            </Button>
                        </View>
                        <ErrorDialog
                            error={orderDetailsError}
                            onClose={() => dispatch(resetClaimOrderError)}
                        />
                    </ScrollView>
                </>
            )}
        </Page>
    )
}

const styles = StyleSheet.create({
    orderDetails: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        fontSize: 18
    },
    estimatedWaitTime: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonMenu: {
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10
    },
    receiptPreviewImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    inlineButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    uploadConfirmButtons: {
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '50%',
        justifyContent: 'center',
        rowGap: 10
    },
    receiptPreviewContainer: {
        flexBasis: '50%',
        height: 200
    },
    reactNativePaperContained: {
        minWidth: 64,
        borderStyle: 'solid',
        backgroundColor: '#9E1B32',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 20
    },
    reactNativePaperContainedText: {
        color: 'white',
        textAlign: 'center',
        marginVertical: 10,
        marginHorizontal: 24,
        fontFamily: 'System',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500'
    },
    reactNativePaperOutlined: {
        minWidth: 64,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20
    },
    reactNativePaperOutlinedText: {
        color: '#9E1B32',
        textAlign: 'center',
        marginVertical: 10,
        marginHorizontal: 24,
        fontFamily: 'System',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500'
    },
    reactNativePaperDisabled: {
        minWidth: 64,
        borderStyle: 'solid',
        backgroundColor: 'rgba(28, 27, 31, 0.25)',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 20
    },
    reactNativePaperDisabledText: {
        color: 'rgba(28, 27, 31, 0.38)',
        textAlign: 'center',
        marginVertical: 10,
        marginHorizontal: 24,
        fontFamily: 'System',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500'
    }
})

export default OrderDetails
