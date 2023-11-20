'use client';

import { isExpired } from '@/lib/utils';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function SignOutOnExpiredToken({ children }) {
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status == 'authenticated' && isExpired(session?.user?.accessExp)) {
			signOut();
		}
	}, [session, status]);

	return children;
}

function Providers({ children }) {
	return (
		<SessionProvider>
			<SignOutOnExpiredToken>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</SignOutOnExpiredToken>
		</SessionProvider>
	);
}

export default Providers;
