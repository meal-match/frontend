export const selectPayoutLoading = ({ payout }) => payout.loading
export const selectPayoutError = ({ payout }) => payout.error
export const selectPayoutAccount = ({ payout }) => payout.account
export const selectPayoutAccountSetupLink = ({ payout }) =>
    payout.accountSetupLink
export const selectPayoutSetupIsComplete = ({ payout }) =>
    payout.setupIsComplete
