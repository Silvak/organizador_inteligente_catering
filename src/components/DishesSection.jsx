'use client';

import { useQuery } from '@tanstack/react-query';
import ProductsSkeletons from './ProductsSkeletons';
import DishCard from './DishCard';
import { getDishes } from '@/services/dish.services';
import { useState } from 'react';
import Pagination from './Pagination';

const dishExample = {
	id: '1',
	name: 'Katsudon',
	description: 'Arroz con cerdo empanizado',
	price: 120,
	image: '/images/katsudon.jpg',
	category: 'Japonesa',
	company: 'Sushi Itto',
	ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
};

export default function DishesSection({ search, limit }) {
	const [pageNumber, setPageNumber] = useState(1);
	const onPageChange = (page) => setPageNumber(page);

	const { data: dishesData, status: dishesStatus } = useQuery({
		queryKey: ['dishes', limit, search, pageNumber],
		queryFn: () =>
			getDishes({
				limit,
				term: search,
				offset: pageNumber,
			}),
	});

	return (
		<section>
			<h1 className="text-gray-700 text-2xl font-bold">Platos</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 mb-8">
				{dishesStatus == 'pending' ? (
					<ProductsSkeletons />
				) : (
					<>
						{dishesStatus == 'success' &&
							dishesData?.dishes?.map((dish) => (
								<DishCard key={dish._id} dish={dish} />
							))}
					</>
				)}
			</div>
			{dishesStatus == 'success' && (
				<Pagination
					currentPage={pageNumber}
					siblingCount={2}
					totalPageCount={dishesData?.paginating.totalpages}
					onPageChange={onPageChange}
				/>
			)}
		</section>
	);
}
