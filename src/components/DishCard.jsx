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
import { Button } from './ui/button';
import { getImgSrc } from '@/lib/utils';

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
					src={getImgSrc('dish', dish.img)}
					alt={dish.title}
					width={300}
					height={300}
					className="rounded-2xl border h-[200px] overflow-hidden"
				/>
			</CardHeader>
			<CardContent
				className="text-center space-y-2 text-gray-700 cursor-pointer"
				onClick={handleOpen}
			>
				<CardTitle>{dish.title}</CardTitle>
				<p>{dish.description}</p>
			</CardContent>

			<CardFooter className="flex justify-between items-center">
				<p className="text-red-500 font-bold">${dish.price}</p>
				<Button variant="ghost" onClick={() => handleAddDish(dish)}>
					<ShoppingCart className="text-red-500 h-7 w-7 cursor-pointer" />
				</Button>
			</CardFooter>
		</Card>
	);
}
