export const displayTime = (time) => {
    const hours = time.getHours()
    const minutes = time.getMinutes()
    return `${(hours % 12 === 0 ? 12 : hours % 12) + ':' + minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 }) + ' ' + (hours > 11 ? 'PM' : 'AM')}`
}
