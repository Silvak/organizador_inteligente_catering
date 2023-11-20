import { apiInstanceWithAuth } from './api';

export const createOrder = (orderData) =>
	apiInstanceWithAuth.post('/check-order', orderData);

export const editOrder = (orderId) => (orderData) =>
	apiInstanceWithAuth.patch(`/check-order/${orderId}`, orderData);

export const deleteOrder = (orderId) => () =>
	apiInstanceWithAuth.delete(`/check-order/${orderId}`);

export const getOrder = (orderId) =>
	apiInstanceWithAuth.get(`/check-order/${orderId}`);

export const getOrders = async ({ limit, offset, term }) => {
	const data = await apiInstanceWithAuth.get('/check-order', {
		params: { limit, offset, term },
	});

	return data.data;
};

export const getOrdersByEnterprise = async ({
	limit,
	offset,
	idTerm,
	orderStatus,
}) => {
	const data = await apiInstanceWithAuth.get('/check-order/byEnterprise', {
		params: { limit, offset, idTerm, orderStatus },
	});

	return data.data;
};

export const getOrdersByPerson = async ({
	limit,
	offset,
	idTerm,
	orderStatus,
}) => {
	const data = await apiInstanceWithAuth.get('/check-order/byPerson', {
		params: { limit, offset, idTerm, orderStatus },
	});

	return data.data;
};
