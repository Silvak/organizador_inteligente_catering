'use client';

import OrderDishAccordion from '@/app/OrderDishAccordion';
import OrderMenuAccordion from '@/components/OrderMenuAccordion';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { getOrders } from '@/services/order.services';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

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

export default function Order({ params }) {
	const { id } = params;
	const { data: session, status } = useSession();

	const { data: orderData, status: orderStatus } = useQuery({
		queryKey: ['order', id],
		queryFn: () => getOrders(id),
	});

	return (
		<div className="space-y-8">
			<h1 className="text-2xl font-bold text-red-500">Pedido</h1>
			{orderStatus == 'pending' ? (
				<div>Cargando</div>
			) : (
				<>
					<section>
						{status == 'authenticated' &&
							session.user.user.role === 'COMPANY_ROLE' && (
								<h2 className="text-xl font-semibold text-red-500">
									{orderData?.user.user.name}
								</h2>
							)}
						{status == 'authenticated' &&
							session.user.user.role === 'USER_ROLE' && (
								<h2 className="text-xl font-semibold text-red-500">
									{orderData?.user.user.company}
								</h2>
							)}
						<h2 className="text-xl font-semibold text-red-500">Usuario</h2>
						<p>
							<span className="font-medium">Fecha del pedido:</span>{' '}
							{new Date().toLocaleDateString()}
						</p>
					</section>

					<section className="flex items-center justify-between">
						<div className="text-center">
							<h3 className="font-medium text-lg">Cantidad de personas</h3>
							<p>4</p>
						</div>
						<div className="text-center">
							<h3 className="font-medium text-lg">Fecha de entrega</h3>
							<p>{new Date().toLocaleDateString()}</p>
						</div>

						{status == 'authenticated' &&
							session.user.user.role === 'COMPANY_ROLE' && (
								<Button className="bg-[#F86260]">Marcar como completada</Button>
							)}
						{status == 'authenticated' &&
							session.user.user.role === 'USER_ROLE' && (
								<div className="text-center">
									<h3 className="font-medium text-lg">Estado</h3>
									<p>Pendiente</p>
								</div>
							)}

						{/* if user show status here */}
						<Button className="bg-[#F86260]">Marcar como completada</Button>
					</section>

					<section>
						<h2 className="text-xl font-semibold text-red-500">Platos</h2>
						<div>
							<OrderDishAccordion dishes={dishes} />
						</div>
					</section>
					<section>
						<h2 className="text-xl font-semibold text-red-500">Menus</h2>
						<div>
							<OrderMenuAccordion menus={menus} />
						</div>
					</section>
				</>
			)}
		</div>
	);
}
