import { apiInstance, apiInstanceWithAuth } from './api';

export const login = (credentials) =>
	apiInstance.post('/user/login', credentials);

export const signUp = (userData) =>
	apiInstance.post('/user/register', userData);

export const editCompany = (companyId) => (companyData) =>
	apiInstanceWithAuth.put(`/user/${companyId}`, companyData);

export const getUser = (userId) => () =>
	apiInstanceWithAuth.get(`/user/${userId}`);

export const deleteCompany = (companyId) => () =>
	apiInstanceWithAuth.delete(`/user/${companyId}`);

export const getCompanies = async ({ limit, offset, term }) => {
	const data = await apiInstanceWithAuth.get('/users', {
		params: { limit, offset, term },
	});

	return data.data;
};
