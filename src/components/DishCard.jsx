'use client';

import Image from 'next/image';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';
import DishDialog from './DishDialog';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/app/cartStore';
import { useToast } from './ui/use-toast';

export default function DishCard({ dish }) {
	const [open, setOpen] = useState(false);
	const addDish = useCartStore((state) => state.addDish);
	const { toast } = useToast();

	function handleOpen() {
		setOpen(true);
	}

	function handleAddDish(dish) {
		addDish(dish);
		toast({ title: 'Plato agregado al carrito' });
	}

	return (
		<Card className="rounded-3xl shadow-lg">
			<DishDialog dish={dish} open={open} setOpen={setOpen} />

			<CardHeader className="cursor-pointer" onClick={handleOpen}>
				<Image
					src={dish.image}
					alt={dish.name}
					width={300}
					height={300}
					className="rounded-2xl border"
				/>
			</CardHeader>
			<CardContent
				className="text-center space-y-2 text-gray-700 cursor-pointer"
				onClick={handleOpen}
			>
				<p>{dish.company}</p>
				<CardTitle>{dish.name}</CardTitle>
			</CardContent>

			<CardFooter className="flex justify-between items-center">
				<p className="text-red-500 font-bold">${dish.price}</p>
				<ShoppingCart
					className="text-red-500 h-7 w-7 cursor-pointer"
					onClick={() => handleAddDish(dish)}
				/>
			</CardFooter>
		</Card>
	);
}
