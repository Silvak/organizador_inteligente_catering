'use client';

import { Card, CardContent } from './ui/card';
import { getCompanies } from '@/services/user.services';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Pagination from './Pagination';
import AdminCompanyTable from './AdminCompanyTable';

export default function AdminCompanyData() {
	const [pageNumber, setPageNumber] = useState(1);
	const [limit, setLimit] = useState(8);
	const onPageChange = (page) => setPageNumber(page);

	const { data, status } = useQuery({
		queryKey: ['companies', pageNumber, limit],
		queryFn: () =>
			getCompanies({
				limit,
				offset: pageNumber,
			}),
	});

	return (
		<Card>
			<CardContent className="p-0">
				{status == 'success' && (
					<AdminCompanyTable companies={data?.enterprises} />
				)}
			</CardContent>

			{status == 'success' && (
				<Pagination
					currentPage={pageNumber}
					siblingCount={2}
					totalPageCount={data?.paginating.totalpages}
					onPageChange={onPageChange}
				/>
			)}
		</Card>
	);
}
