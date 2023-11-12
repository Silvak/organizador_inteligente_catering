'use client';

import Image from 'next/image';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import { ShoppingCart } from 'lucide-react';
import MenuDialog from './MenuDialog';
import { useState } from 'react';

const menu = {
	id: '1',
	name: 'Sushi Itto',
	description: 'Sushi, Japonesa',
	image: '/images/katsudon.jpg',
	company: 'Sushi Itto',
	dishes: [
		{
			name: 'Katsudon',
			description: 'Arroz con cerdo empanizado',
			price: 120,
			image: '/images/katsudon.jpg',
			category: 'Japonesa',
			company: 'Sushi Itto',
			ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
		},
		{
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

export default function MenuCard() {
	const [open, setOpen] = useState(false);

	const menuPrice = menu.dishes.reduce((acc, dish) => acc + dish.price, 0);

	function handleOpen() {
		setOpen(true);
	}

	return (
		<Card className="rounded-3xl shadow-lg">
			<MenuDialog open={open} setOpen={setOpen} />

			<CardHeader className="cursor-pointer" onClick={handleOpen}>
				<Image
					src={menu.image}
					alt={menu.name}
					width={300}
					height={300}
					className="rounded-2xl border"
				/>
			</CardHeader>
			<CardContent
				className="text-center space-y-2 text-gray-700 cursor-pointer"
				onClick={handleOpen}
			>
				<p>{menu.company}</p>
				<CardTitle>{menu.name}</CardTitle>

				<ul className="text-start">
					{menu.dishes.map((dish) => (
						<li key={dish.id}>{dish.name}</li>
					))}
				</ul>
			</CardContent>

			<CardFooter className="flex justify-between items-center">
				<p className="text-red-500 font-bold">${menuPrice}</p>
				<ShoppingCart className="text-red-500 h-7 w-7" />
			</CardFooter>
		</Card>
	);
}
