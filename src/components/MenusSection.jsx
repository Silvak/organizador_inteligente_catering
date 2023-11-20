'use client';

import { useQuery } from '@tanstack/react-query';
import ProductsSkeletons from './ProductsSkeletons';
import MenuCard from './MenuCard';
import { getMenus } from '@/services/dish.services';
import { useState } from 'react';
import Pagination from './Pagination';

export default function MenusSection({ search, limit }) {
	const [pageNumber, setPageNumber] = useState(1);
	const onPageChange = (page) => setPageNumber(page);

	const { data: menusData, status: menusStatus } = useQuery({
		queryKey: ['menus', limit, search, pageNumber],
		queryFn: () =>
			getMenus({
				limit,
				term: search,
				offset: pageNumber,
			}),
	});

	return (
		<section>
			<h1 className="text-gray-700 text-2xl font-bold">Menus</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 mb-8">
				{menusStatus == 'pending' ? (
					<ProductsSkeletons />
				) : (
					<>
						{menusStatus == 'success' &&
							menusData?.menuDishes?.map((menu) => (
								<MenuCard key={menu._id} menu={menu} />
							))}
					</>
				)}
			</div>
			{menusStatus == 'success' && (
				<Pagination
					currentPage={pageNumber}
					siblingCount={2}
					totalPageCount={menusData?.paginating.totalpages}
					onPageChange={onPageChange}
				/>
			)}
		</section>
	);
}
