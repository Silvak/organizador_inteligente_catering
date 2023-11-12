import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import { useCartStore } from '@/app/cartStore';
import { usePreferencesStore } from '@/app/preferencesStore';
import { useRouter } from 'next/navigation';

export default function DishDialog({ dish, open, setOpen }) {
	const addDish = useCartStore((state) => state.addDish);
	const setDish = usePreferencesStore((state) => state.setDish);
	const router = useRouter();

	function handleAddDish(dish) {
		addDish(dish);
	}

	function handlePreferences(dish) {
		setDish(dish);
		router.push('/preferences/dish');
	}

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
					<ShoppingCart
						className="text-red-500 h-7 w-7"
						onClick={() => handleAddDish(dish)}
					/>
				</div>
				<Button
					className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 w-full rounded-md shadow-lg"
					onClick={() => handlePreferences(dish)}
				>
					Preferencias
				</Button>
			</DialogContent>
		</Dialog>
	);
}
