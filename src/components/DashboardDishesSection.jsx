'use client';

import { getDishes } from '@/services/dish.services';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import DashboardProductSkeleton from './DashboardProductSkeleton';
import CreateDishDialog from './CreateDishDialog';
import DashboardDishCard from './DashboardDishCard';
import Pagination from './Pagination';

const dishes = [
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
	{
		id: '3',
		name: 'Sushi',
		description: 'Arroz con cerdo empanizado',
		price: 120,
		image: '/images/katsudon.jpg',
		category: 'Japonesa',
		company: 'Sushi Itto',
		ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
	},
];

export default function DashboardDishesSection() {
	const [pageNumber, setPageNumber] = useState(1);
	const onPageChange = (page) => setPageNumber(page);
	const limit = 3;

	const { data: dishesData, status: dishesStatus } = useQuery({
		queryKey: ['dishes', limit, pageNumber],
		queryFn: () =>
			getDishes({
				limit,
				term: debouncedSearch,
				offset: pageNumber,
			}),
	});

	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold">Platos</h2>
				<CreateDishDialog />
			</div>
			{dishesStatus === 'pending' ? (
				<DashboardProductSkeleton />
			) : (
				<>
					<div className="space-y-4">
						{dishesData?.dishes.map((dish) => (
							<DashboardDishCard key={dish.id} dish={dish} />
						))}
						{dishes.map((dish) => (
							<DashboardDishCard key={dish.id} dish={dish} />
						))}
					</div>
					{dishesStatus == 'success' && (
						<Pagination
							currentPage={pageNumber}
							siblingCount={2}
							totalPageCount={dishesData?.paginating.totalpages}
							onPageChange={onPageChange}
						/>
					)}
				</>
			)}
		</section>
	);
}
