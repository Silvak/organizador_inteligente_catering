import React from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';
import { useCartStore } from '@/app/cartStore';
import { usePreferencesStore } from '@/app/preferencesStore';
import { useRouter } from 'next/navigation';
import { getImgSrc } from '@/lib/utils';

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
						src={getImgSrc('dish', dish.img)}
						alt={dish.title}
						width={300}
						height={300}
						className="rounded-2xl border w-1/2"
					/>
					<div className="w-1/2 space-y-2 text-gray-700">
						<h1 className="text-lg font-semibold">{dish.title}</h1>
						<p>{dish.description}</p>
					</div>
				</div>

				<div className="w-1/2 space-y-2 text-gray-700">
					<h1 className="text-lg font-semibold">Ingredientes</h1>
					<div>
						{dish.ingredients.map((ingredient) => (
							<p key={ingredient._id}>{ingredient.title}</p>
						))}
					</div>
				</div>
				<div className="flex justify-between items-center">
					<p className="text-red-500 font-bold">${dish.price}</p>
					<Button variant="ghost" onClick={() => handleAddDish(dish)}>
						<ShoppingCart className="text-red-500 h-7 w-7 cursor-pointer" />
					</Button>
				</div>
				<Button
					className="bg-[#F86260] hover:bg-red-500 w-full rounded-md shadow-lg"
					onClick={() => handlePreferences(dish)}
				>
					Preferencias
				</Button>
			</DialogContent>
		</Dialog>
	);
}
