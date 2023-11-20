import { apiInstanceWithAuth } from './api';

export const createDish = (dishData) =>
	apiInstanceWithAuth.post('/dishes', dishData);

export const uploadDishImage = (dishId, formData) =>
	apiInstanceWithAuth.post(`/files/dish/${dishId}`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

export const createMenu = (menuData) =>
	apiInstanceWithAuth.post('/menu-dishes', menuData);

export const uploadMenuImage = (menuId, formData) =>
	apiInstanceWithAuth.post(`/files/menuDish/${menuId}`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

export const editDish = (dishId) => (dishData) =>
	apiInstanceWithAuth.patch(`/dishes/${dishId}`, dishData);

export const editMenu = (menuId) => (menuData) =>
	apiInstanceWithAuth.patch(`/menu-dishes/${menuId}`, menuData);

export const deleteDish = (dishId) => () =>
	apiInstanceWithAuth.delete(`/dishes/${dishId}`);

export const deleteMenu = (menuId) => () =>
	apiInstanceWithAuth.delete(`/menu-dishes/${menuId}`);

export const getDishes = async ({ limit, offset, term }) => {
	const data = await apiInstanceWithAuth.get('/dishes', {
		params: { limit, offset, term },
	});

	return data.data;
};

export const getMenus = async ({ limit, offset, term }) => {
	const data = await apiInstanceWithAuth.get('/menu-dishes', {
		params: { limit, offset, term },
	});

	return data.data;
};

export const getDish = (dishId) => apiInstanceWithAuth.get(`/dishes/${dishId}`);

export const getMenu = (menuId) =>
	apiInstanceWithAuth.get(`/menu-dishes/${menuId}`);
