export const selectIsLoggedIn = ({ auth }) => auth.isLoggedIn
export const selectAuthError = ({ auth }) => auth.authError
export const selectAuthLoading = ({ auth }) => auth.authLoading
export const selectResetEmailSent = ({ auth }) => auth.resetEmailSent
export const selectPasswordReset = ({ auth }) => auth.passwordReset
export const selectCreateAccount = ({ auth }) => auth.createAccount
