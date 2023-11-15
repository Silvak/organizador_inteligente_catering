export const createOrder = (orderData) => apiInstance.post('/order', orderData);

export const editOrder = (orderId) => (orderData) =>
	apiInstanceWithAuth.patch(`/order/${orderId}`, orderData);

export const deleteOrder = (orderId) => () =>
	apiInstanceWithAuth.delete(`/order/${orderId}`);

export const getOrders = async ({ limit, offset, term }) => {
	const data = await apiInstanceWithAuth.get('/orders', {
		params: { limit, offset, term },
	});

	return data.data;
};
