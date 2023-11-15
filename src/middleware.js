import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

/* The code is exporting a middleware function that checks if the requested URL path is included in the
`adminRoutes` array and if the user's role is not 'admin'. If both conditions are true, it redirects
the user to the login page. This middleware function is wrapped with the `withAuth` higher-order
function, which ensures that the user is authenticated before executing the middleware logic. */
export default withAuth(
	// function middleware(req) {
	// 	// Protect admin routes
	// 	if (
	// 		req.nextUrl.pathname == '/dashboard/admin' &&
	// 		req.nextauth.token.user.rol != 'ADMIN_ROLE'
	// 	) {
	// 		return NextResponse.redirect(new URL('/home', req.url));
	// 	}

	// 	return NextResponse.next();
	// },
	{
		callbacks: {
			authorized: ({ token }) => true,
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
// export const config = {
// 	matcher: [
// 		'/dashboard/admin',
// 		'/dashboard/specialist',
// 		'/profile',
// 		'/blog',
// 		'/legal',
// 		'/products',
// 		'/upload',
// 		'/home',
// 	],
// };
