import { apiInstance, apiInstanceWithAuth } from './api';

export const login = (credentials) =>
	apiInstance.post('/user/login', credentials);

export const signUp = (userData) =>
	apiInstance.post('/user/register', userData);

export const createPerson = (personData) =>
	apiInstance.post('/person', personData);

export const createEnterprise = (enterpriseData) =>
	apiInstance.post('/enterprise', enterpriseData);

export const editCompany = (companyId) => (companyData) =>
	apiInstanceWithAuth.patch(`/user/${companyId}`, companyData);

export const getUser = (userId) => () =>
	apiInstanceWithAuth.get(`/user/${userId}`);

export const getUsers = async ({ limit, offset, term }) => {
	const data = await apiInstanceWithAuth.get('/user', {
		params: { limit, offset, term },
	});

	return data.data;
};

export const getPerson = (personId) => () =>
	apiInstanceWithAuth.get(`/person/${personId}`);

export const getEnterprise = (enterpriseId) => () =>
	apiInstanceWithAuth.get(`/enterprise/${enterpriseId}`);

export const editEnterprise = (companyId) => (companyData) =>
	apiInstanceWithAuth.patch(`/enterprise/${companyId}`, companyData);

export const deleteCompany = (companyId) => () =>
	apiInstanceWithAuth.delete(`/user/${companyId}`);

export const getCompanies = async ({ limit, offset, term }) => {
	const data = await apiInstanceWithAuth.get('/enterprise', {
		params: { limit, offset, term },
	});

	return data.data;
};

export const uploadCompanyImage = (companyId, formData) =>
	apiInstanceWithAuth.post(`/files/enterprise/${companyId}`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

export const uploadPersonImage = (personId, formData) =>
	apiInstanceWithAuth.post(`/files/person/${personId}`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
