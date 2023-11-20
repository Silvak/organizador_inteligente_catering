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
import { useCartStore } from '@/app/cartStore';
import { useToast } from './ui/use-toast';
import { getImgSrc } from '@/lib/utils';

export default function MenuCard({ menu }) {
	const [open, setOpen] = useState(false);
	const addMenu = useCartStore((state) => state.addMenu);
	const { toast } = useToast();

	function handleOpen() {
		setOpen(true);
	}

	function handleAddMenu(menu) {
		addMenu(menu);
		toast({ title: 'Menu agregado al carrito' });
	}

	const menuPrice = menu.dishes.reduce((acc, dish) => acc + dish.price, 0);

	return (
		<Card className="rounded-3xl shadow-lg">
			<MenuDialog menu={menu} open={open} setOpen={setOpen} />

			<CardHeader className="cursor-pointer" onClick={handleOpen}>
				<Image
					src={getImgSrc('menuDish', menu.img)}
					alt={menu.title}
					width={300}
					height={300}
					className="rounded-2xl border h-[200px] overflow-hidden"
				/>
			</CardHeader>
			<CardContent
				className="text-center space-y-2 text-gray-700 cursor-pointer"
				onClick={handleOpen}
			>
				<CardTitle>{menu.title}</CardTitle>
				<p>{menu.description}</p>

				{/* <ul className="text-start">
					{menu.dishes.map((dish) => (
						<li key={dish._id}>{dish.title}</li>
					))}
				</ul> */}
			</CardContent>

			<CardFooter className="flex justify-between items-center">
				<p className="text-red-500 font-bold">${menuPrice}</p>
				<ShoppingCart
					className="text-red-500 h-7 w-7 cursor-pointer"
					onClick={() => handleAddMenu(menu)}
				/>
			</CardFooter>
		</Card>
	);
}
