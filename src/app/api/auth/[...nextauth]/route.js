import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { login } from '@/services/user.services';
import { jwtDecode } from 'jwt-decode';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'email', type: 'email', placeholder: 'test@test.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					const user = await login({
						email: credentials.email,
						password: credentials.password,
					});

					return user.data;
				} catch (e) {
					console.log(e);
					throw e;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ user, token }) {
			if (token.accessExp) {
				return { ...user, ...token };
			} else {
				const accessExp = user?.token
					? jwtDecode(user?.token).exp
					: token?.token
					? jwtDecode(token?.token).exp
					: undefined;

				return { ...user, ...token, accessExp };
			}
		},
		async session({ session, token }) {
			session.user = token;
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
});

export { handler as GET, handler as POST };
