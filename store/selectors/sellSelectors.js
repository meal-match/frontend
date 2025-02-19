export const selectOrders = ({ sell }) => sell.orders
export const selectOrdersLoading = ({ sell }) => sell.ordersInitialLoading
export const selectOrdersError = ({ sell }) => sell.ordersError
export const selectClaimedOrder = ({ sell }) => sell.claimedOrder
export const selectClaimedOrderLoading = ({ sell }) => sell.claimedOrderLoading
export const selectClaimedOrderError = ({ sell }) => sell.claimedOrderError
export const selectOrderConfirmed = ({ sell }) => sell.orderConfirmed
