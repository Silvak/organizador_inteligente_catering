'use client';

import DashboardOrderCard from '@/components/DashboardOrderCard';
import DashboardProductSkeleton from '@/components/DashboardProductSkeleton';
import Pagination from '@/components/Pagination';
import { getOrders } from '@/services/order.services';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const orders = [
	{
		id: '1',
		company: 'Sushi Itto',
		user: 'Juan Perez',
		created_at: '2021-09-01T00:00:00.000Z',
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
	},
	{
		id: '2',
		company: 'Sushi Itto',
		user: 'Juan Perez',
		created_at: '2021-09-01T00:00:00.000Z',
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
	},
	{
		id: '3',
		company: 'Sushi Itto',
		user: 'Juan Perez',
		created_at: '2021-09-01T00:00:00.000Z',
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
	},
];

export default function Page() {
	const [pageNumber, setPageNumber] = useState(1);
	const onPageChange = (page) => setPageNumber(page);
	const limit = 3;

	const { data: ordersData, status: ordersStatus } = useQuery({
		queryKey: ['orders', limit, pageNumber, 'pending'],
		queryFn: () =>
			getOrders({
				limit,
				term: 'pending',
				offset: pageNumber,
			}),
	});

	return ordersStatus == 'pending' ? (
		<DashboardProductSkeleton />
	) : (
		<>
			<div className="space-y-4">
				{ordersData?.orders.map((order) => (
					<DashboardOrderCard key={order.id} order={order} />
				))}
				{orders.map((order) => (
					<DashboardOrderCard key={order.id} order={order} />
				))}
			</div>
			{ordersStatus == 'success' && (
				<Pagination
					currentPage={pageNumber}
					siblingCount={2}
					totalPageCount={menusData?.paginating.totalpages}
					onPageChange={onPageChange}
				/>
			)}
		</>
	);
}
