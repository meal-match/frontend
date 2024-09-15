/* eslint-disable no-undef */
import React from 'react'
import {StyleSheet, View, Button, Text, Dimensions, ScrollView } from 'react-native'
import { Link } from 'expo-router'

import Page from '@components/Page'

const { width: screenWidth } = Dimensions.get('window');

const Sell = () => {
    const options = [
        {
            label: 'Chick-fil-A',
            time: '2024-09-14T19:30:00'
        },
        {
            label: 'Panda',
            time: '2024-09-14T19:30:00'
        },
        {
            label: 'Dunkin',
            time: '2024-09-14T19:35:00'
        },
        {
            label: "Canes",
            time: '2024-09-14T19:40:00'
        },
        {
            label: "Pres-Deli",
            time: '2024-09-14T19:40:00'
        },
        {
            label: "Julias",
            time: '2024-09-14T20:00:00'
        },
        {
            label: "Wendy's",
            time: '2024-09-14T20:00:00'
        },
    ]

    const formatTimeWithIntl = (timeString) => {
        const date = new Date(timeString);  // Convert the ISO time string to a Date object
    
        // Use Intl.DateTimeFormat with options for time only (hours, minutes, AM/PM)
        const formatter = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,  // This ensures the time is in 12-hour format with AM/PM
        });
        return formatter.format(date);
    };

    const isWithin15Minutes = (optionTime) => {
        const currentTime = new Date();  // Get the current time
        const optionDate = new Date(optionTime);  // Parse the option time into a Date object
        // Calculate the difference in minutes
        const timeDifference = (optionDate - currentTime) / (1000 * 60);  // Difference in minutes
        return timeDifference >= 0 && timeDifference <= 15;  // Return true if within 30 minutes
    };

    return (
        <Page header="Select Order" style={styles.page}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {options.map((option, index) => {
                    const within30Minutes = isWithin15Minutes(option.time);  // Check if within 30 minutes
                    return (
                        <View key={option.label}>
                            
                            <Link
                                key={option.label}
                                style={styles.locationLink}
                                href="/buy/test"
                            >
                                <View style={styles.rowContainer}>
                                    <View style={styles.textColumn}>
                                        <Text style={styles.location}>
                                        {option.label}
                                        </Text>
                                        <Text style={[styles.timeText,
                                            within30Minutes && styles.highlightedLink  // Apply different style if within 30 minutes
                                        ]}>
                                        {"\n"}
                                        {"\n"}
                                        {formatTimeWithIntl(option.time)}</Text>
                                    </View>
                                </View>
                                <View style={styles.buttonColumn}>
                                    <Button title="Select" onPress={() => {/* Handle button press */}} />
                                </View>
                            </Link>
                            {index < options.length - 1 && <View style={styles.divider} />}
                        </View>
                    );
                })}
            </ScrollView>
        </Page>
    )
}

const styles = StyleSheet.create({
    page: {
        headerTitleAlign: 'left',
        flex:1,
    },
    highlightedLink: {
        color: '#FF0000',  // A different background color for items within 30 minutes
    },
    scrollContainer: {
        flexGrow: 1,  // Allow the content to grow and be scrollable
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'space-around',
        marginTop: screenWidth * 0.1 / 3,
        gap: screenWidth * 0.01,  // Optional: padding around the content
    },
    locationLink: {
        width: screenWidth * 0.9,
        padding: 4,
    },
    location: {
        fontSize: 25
    },
    timeText: {
        fontSize: 15,
    },
    rowContainer: {
        flexDirection: 'row',
        
        justifyContent: 'space-between',
        alignItems: 'center',  // Ensures items in each row align properly
        width: '100%',
    },
    textColumn: {
        flex: 1,  // Take up most of the width
        justifyContent: 'center',
    },

    buttonColumn: {
    },
    divider: {
        width: '100%',  // Divider spans full width of the screen
        height: 1,  // Thin divider
        backgroundColor: '#828A8F',  // Light gray color for the divider
        marginTop: 10,  // Spacing between links and dividers
    }
})

export default Sell
