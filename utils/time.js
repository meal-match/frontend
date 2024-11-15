export const formatTimeWithIntl = (timeString) => {
    const date = new Date(timeString) // Convert the ISO time string to a Date object

    // Use Intl.DateTimeFormat with options for time only (hours, minutes, AM/PM)
    const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true // This ensures the time is in 12-hour format with AM/PM
    })
    return formatter.format(date)
}

export const isWithin15Minutes = (optionTime) => {
    const currentTime = new Date() // Get the current time
    const optionDate = new Date(optionTime) // Parse the option time into a Date object
    // Calculate the difference in minutes
    const timeDifference = (optionDate - currentTime) / (1000 * 60) // Difference in minutes
    return timeDifference >= 0 && timeDifference <= 15 // Return true if within 30 minutes
}
