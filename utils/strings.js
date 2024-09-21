export const checkPasswordRequirements = (password) => {
    const requirements = []
    if (password.length < 8) {
        requirements.push('At least 8 characters')
    }
    if (!/[0-9]/.test(password)) {
        requirements.push('One number')
    }
    if (!/[A-Z]/.test(password)) {
        requirements.push('One uppercase letter')
    }
    if (!/[a-z]/.test(password)) {
        requirements.push('One lowercase letter')
    }
    if (!/[!@#$%^&*]/.test(password)) {
        requirements.push('One special character - !@#$%^&*')
    }
    return requirements
}
