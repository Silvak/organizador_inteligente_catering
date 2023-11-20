'use client';

import DashboardOrderCard from '@/components/DashboardOrderCard';
import DashboardProductSkeleton from '@/components/DashboardProductSkeleton';
import Pagination from '@/components/Pagination';
import { getOrdersByEnterprise } from '@/services/order.services';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Page() {
	const { data: session, status } = useSession();
	const [pageNumber, setPageNumber] = useState(1);
	const onPageChange = (page) => setPageNumber(page);
	const limit = 3;

	const { data: ordersData, status: ordersStatus } = useQuery({
		queryKey: [
			'orders',
			limit,
			pageNumber,
			session?.user?.user.enterprise[0],
			'ENTREGADO',
		],
		queryFn: () =>
			getOrdersByEnterprise({
				limit,
				idTerm: session?.user?.user.enterprise[0],
				offset: pageNumber,
				orderStatus: 'ENTREGADO',
			}),
		enabled: !!session?.user?.user.enterprise[0],
	});

	return ordersStatus == 'pending' ? (
		<DashboardProductSkeleton />
	) : (
		<>
			<div className="space-y-4">
				{ordersData?.order.map((order) => (
					<DashboardOrderCard key={order._id} order={order} />
				))}
			</div>
			{ordersStatus == 'success' && (
				<Pagination
					currentPage={pageNumber}
					siblingCount={2}
					totalPageCount={ordersData?.paginating.totalpages}
					onPageChange={onPageChange}
				/>
			)}
		</>
	);
}
