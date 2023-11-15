'use client';

import { useQuery } from '@tanstack/react-query';
import ProductsSkeletons from './ProductsSkeletons';
import { Pagination } from '@tanstack/react-table';
import MenuCard from './MenuCard';
import { getMenus } from '@/services/dish.services';
import { useState } from 'react';

const menuExample = {
	id: '1',
	name: 'Sushi Itto',
	description: 'Sushi, Japonesa',
	image: '/images/katsudon.jpg',
	company: 'Sushi Itto',
	dishes: [
		{
			id: '1',
			name: 'Katsudon',
			description: 'Arroz con cerdo empanizado',
			price: 120,
			image: '/images/katsudon.jpg',
			category: 'Japonesa',
			company: 'Sushi Itto',
			ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
		},
		{
			id: '2',
			name: 'Sushi',
			description: 'Arroz con cerdo empanizado',
			price: 120,
			image: '/images/katsudon.jpg',
			category: 'Japonesa',
			company: 'Sushi Itto',
			ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
		},
	],
};

export default function MenusSection({ search, limit }) {
	const [pageNumber, setPageNumber] = useState(1);
	const onPageChange = (page) => setPageNumber(page);

	const { data: menusData, status: menusStatus } = useQuery({
		queryKey: ['menus', limit, search, pageNumber],
		queryFn: () =>
			getMenus({
				limit,
				term: debouncedSearch,
				offset: pageNumber,
			}),
	});

	return (
		<section>
			<h1 className="text-gray-700 text-2xl font-bold">Menus</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
				{menusStatus == 'pending' ? (
					<ProductsSkeletons />
				) : (
					<>
						{menusStatus == 'success' &&
							menusData?.menus?.map((menu) => (
								<MenuCard key={menu._id} menu={menu} />
							))}

						<MenuCard menu={menuExample} />
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
