'use client';

import { Card, CardContent } from './ui/card';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Pagination from './Pagination';
import { getIngredients } from '@/services/ingredients.services';
import AdminIngredientsTable from './AdminIngredientsTable';

export default function AdminIngredientsData() {
	const [pageNumber, setPageNumber] = useState(1);
	const [limit, setLimit] = useState(8);
	const onPageChange = (page) => setPageNumber(page);

	const { data, status } = useQuery({
		queryKey: ['ingredients', pageNumber, limit],
		queryFn: () =>
			getIngredients({
				limit,
				offset: pageNumber,
			}),
	});

	return (
		<Card>
			<CardContent className="p-0">
				{status == 'success' && (
					<AdminIngredientsTable ingredients={data?.ingredients} />
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
