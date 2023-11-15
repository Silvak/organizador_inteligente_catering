import { apiInstanceWithAuth } from './api';

export const createDish = (dishData) =>
	apiInstanceWithAuth.post('/dish', dishData);

export const uploadDishImage = (dishId, formData) =>
	apiInstanceWithAuth.post(`/files/dish/${dishId}`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

export const createMenu = (menuData) =>
	apiInstanceWithAuth.post('/menu', menuData);

export const uploadMenuImage = (menuId, formData) =>
	apiInstanceWithAuth.post(`/files/menu/${menuId}`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

export const editDish = (dishId) => (dishData) =>
	apiInstanceWithAuth.patch(`/dish/${dishId}`, dishData);

export const editMenu = (menuId) => (menuData) =>
	apiInstanceWithAuth.patch(`/menu/${menuId}`, menuData);

export const deleteDish = (dishId) => () =>
	apiInstanceWithAuth.delete(`/dish/${dishId}`);

export const deleteMenu = (menuId) => () =>
	apiInstanceWithAuth.delete(`/menu/${menuId}`);

export const getDishes = async ({ limit, offset, term }) => {
	const data = await apiInstanceWithAuth.get('/dishes', {
		params: { limit, offset, term },
	});

	return data.data;
};

export const getMenus = async ({ limit, offset, term }) => {
	const data = await apiInstanceWithAuth.get('/menus', {
		params: { limit, offset, term },
	});

	return data.data;
};

export const getDish = (dishId) => apiInstanceWithAuth.get(`/dish/${dishId}`);

export const getMenu = (menuId) => apiInstanceWithAuth.get(`/menu/${menuId}`);
