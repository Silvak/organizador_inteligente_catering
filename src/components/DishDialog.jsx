import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';

const dish = {
	name: 'Katsudon',
	description: 'Arroz con cerdo empanizado',
	price: 120,
	image: '/images/katsudon.jpg',
	category: 'Japonesa',
	company: 'Sushi Itto',
	ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
};

export default function DishDialog({ open, setOpen }) {
	return (
		<Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
			<DialogContent className="sm:rounded-3xl">
				<div className="flex gap-4">
					<Image
						src={dish.image}
						alt={dish.name}
						width={300}
						height={300}
						className="rounded-2xl border w-1/2"
					/>
					<div className="w-1/2 space-y-2 text-gray-700">
						<h1 className="text-lg font-semibold">{dish.name}</h1>
						<p>{dish.description}</p>
					</div>
				</div>

				<div className="w-1/2 space-y-2 text-gray-700">
					<h1 className="text-lg font-semibold">Ingredientes</h1>
					<ul>
						{dish.ingredients.map((ingredient) => (
							<p key={ingredient}>{ingredient}</p>
						))}
					</ul>
				</div>
				<div className="flex justify-between items-center">
					<p className="text-red-500 font-bold">${dish.price}</p>
					<ShoppingCart className="text-red-500 h-7 w-7" />
				</div>
				<Button className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 w-full rounded-md shadow-lg">
					Preferencias
				</Button>
			</DialogContent>
		</Dialog>
	);
}
