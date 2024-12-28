export const displayPickerTime = (time) => {
    const hours = time.getHours()
    const minutes = time.getMinutes()
    const hoursString = hours % 12 === 0 ? 12 : hours % 12
    const minutesString = minutes.toLocaleString('en-US', {
        minimumIntegerDigits: 2
    })
    const timeOfDayString = hours > 11 ? 'PM' : 'AM'
    return `${hoursString}:${minutesString} ${timeOfDayString}`
}

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

export const convertTimeToDateObject = (timeString) => {
    const d = new Date()

    const regexTime = /(1?\d):(\d\d) (AM|PM)/
    const timeArr = regexTime.exec(timeString)
    const isoTimeString = `${
        timeArr[3] === 'PM'
            ? String((Number(timeArr[1]) + 12) % 24)
            : String(Number(timeArr[1]) % 24)
    }:${timeArr[2]}:00`
    const mdy = d
        .toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        })
        .split('/')
    const isoDateString = `${mdy[2]}-${mdy[0]}-${mdy[1]}`
    const time = new Date(`${isoDateString}T${isoTimeString}`)
    return time
}

export const getCloseTimeFromHoursObject = (hours) => {
    const d = new Date()
    const day = d.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const closeTime = hours[day].close
    return closeTime
}

export const getOpenTimeFromHoursObject = (hours) => {
    const d = new Date()
    const day = d.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    const openTime = hours[day].open
    return openTime
}
