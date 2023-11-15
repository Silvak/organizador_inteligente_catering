'use client';

import { getMenus } from '@/services/dish.services';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import DashboardProductSkeleton from './DashboardProductSkeleton';
import Pagination from './Pagination';
import DashboardMenuCard from './DashboardMenuCard';
import CreateMenuDialog from './CreateMenuDialog';

const menus = [
	{
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
		],
	},
	{
		id: '2',
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
		],
	},
	{
		id: '3',
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
		],
	},
];

export default function DashboardMenusSection() {
	const [pageNumber, setPageNumber] = useState(1);
	const onPageChange = (page) => setPageNumber(page);
	const limit = 3;

	const { data: menusData, status: menusStatus } = useQuery({
		queryKey: ['menus', limit, pageNumber],
		queryFn: () =>
			getMenus({
				limit,
				offset: pageNumber,
			}),
	});

	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold">Menus</h2>
				<CreateMenuDialog />
			</div>
			{menusStatus === 'pending' ? (
				<DashboardProductSkeleton />
			) : (
				<>
					<div className="space-y-4">
						{menusData?.menus.map((menu) => (
							<DashboardMenuCard key={menu.id} menu={menu} />
						))}
						{menus.map((menu) => (
							<DashboardMenuCard key={menu.id} menu={menu} />
						))}
					</div>
					{menusStatus == 'success' && (
						<Pagination
							currentPage={pageNumber}
							siblingCount={2}
							totalPageCount={menusData?.paginating.totalpages}
							onPageChange={onPageChange}
						/>
					)}
				</>
			)}
		</section>
	);
}
