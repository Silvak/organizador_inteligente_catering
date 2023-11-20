import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

/* The code is exporting a middleware function that checks if the requested URL path is included in the
`adminRoutes` array and if the user's role is not 'admin'. If both conditions are true, it redirects
the user to the login page. This middleware function is wrapped with the `withAuth` higher-order
function, which ensures that the user is authenticated before executing the middleware logic. */
export default withAuth(
	function middleware(req) {
		// Protect admin routes
		if (
			req.nextauth.token.user.rol != 'ADMIN_ROLE' &&
			['/admin/dashboard/companies', '/admin/dashboard/ingredients'].includes(
				req.nextUrl.pathname
			)
		) {
			return NextResponse.redirect(new URL('/home', req.url));
		}

		if (
			req.nextauth.token.user.rol == 'ADMIN_ROLE' &&
			!['/admin/dashboard/companies', '/admin/dashboard/ingredients'].includes(
				req.nextUrl.pathname
			)
		) {
			return NextResponse.redirect(
				new URL('/admin/dashboard/companies', req.url)
			);
		}

		// Protect company routes
		if (
			req.nextauth.token.user.rol != 'ENTERPRISE_ROLE' &&
			[
				'/dashboard',
				'/dashboard/dishes',
				'/dashboard/orders/completed',
				'/dashboard/orders/pending',
			].includes(req.nextUrl.pathname)
		) {
			return NextResponse.redirect(new URL('/home', req.url));
		}

		if (
			req.nextauth.token.user.rol == 'ENTERPRISE_ROLE' &&
			![
				'/dashboard',
				'/dashboard/dishes',
				'/dashboard/orders/completed',
				'/dashboard/orders/pending',
			].includes(req.nextUrl.pathname)
		) {
			return NextResponse.redirect(new URL('/dashboard/dishes', req.url));
		}

		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
		pages: {
			signIn: '/login',
		},
	}
);

/* The line `export const config = { matcher: protectedRoutes };` is exporting a configuration object
with a property called `matcher`. The value of `matcher` is set to the `protectedRoutes` variable.
This configuration object is used by the Next.js framework to determine which routes should be
protected and require authentication. */
export const config = {
	matcher: [
		'/dashboard/:path*',
		'/admin/:path*',
		'/profile/:path*',
		'/preferences/:path*',
		'/company/:path*',
		'/summary',
		'/home',
		'/cart',
	],
};
