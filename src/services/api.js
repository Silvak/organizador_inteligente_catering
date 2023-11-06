import axios from 'axios';
import { getSession } from 'next-auth/react';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? '/api/v1';

// Api instance for endpoints that not require Authorization
export const apiInstance = axios.create({
	baseURL: BASE_URL,
});

apiInstance.defaults.headers.common['Content-Type'] = 'application/json';

// Api instance for endpoints that require Authorization
export const apiInstanceWithAuth = axios.create({
	baseURL: BASE_URL,
});

apiInstanceWithAuth.defaults.headers.common['Content-Type'] =
	'application/json';

// Intercept request for apiInstanceWithAuth and add token to Authorization header
apiInstanceWithAuth.interceptors.request.use(async (request) => {
	const session = await getSession();
	request.headers.Authorization = `Bearer ${session?.user?.token}`;
	return request;
});
