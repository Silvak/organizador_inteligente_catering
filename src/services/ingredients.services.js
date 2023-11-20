import { apiInstanceWithAuth } from './api';

export const getIngredients = async ({ limit, offset, term }) => {
	const data = await apiInstanceWithAuth.get('/ingredient', {
		params: { limit, offset, term },
	});

	return data.data;
};

export const createIngredient = (ingredientData) =>
	apiInstanceWithAuth.post('/ingredient', ingredientData);

export const editIngredient = (ingredientId) => (ingredientData) =>
	apiInstanceWithAuth.patch(`/ingredient/${ingredientId}`, ingredientData);

export const getIngredient = (ingredientId) =>
	apiInstanceWithAuth.get(`/ingredient/${ingredientId}`);

export const deleteIngredient = (ingredientId) => () =>
	apiInstanceWithAuth.delete(`/ingredient/${ingredientId}`);
