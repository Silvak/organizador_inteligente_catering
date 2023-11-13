'use client';

import { Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import Image from 'next/image';
import { useCartStore } from '@/app/cartStore';
import { useState } from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './ui/accordion';
import SelectIngredients from './SelectMenuDishesIngredients';
import EditMenuDishes from './EditMenuDishes';

export default function CartEditMenuDialog({ menu }) {
	// when backend ready, get dish from backend, and get default ingredients from store or props
	const [open, setOpen] = useState(false);
	const [tempDishes, setTempDishes] = useState([...menu.dishes]);
	const editMenu = useCartStore((state) => state.editMenu);

	function handleEditMenu() {
		editMenu({ ...menu, dishes: [...tempDishes] });
		setOpen(false);
	}
	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				setOpen((prev) => !prev);
			}}
		>
			<DialogTrigger asChild>
				<Button variant="ghost">
					<Eye className="text-red-500 h-7 w-7" />
				</Button>
			</DialogTrigger>

			<DialogContent>
				<div className="flex flex-col gap-8">
					<div>
						<h1 className="text-2xl font-bold">{menu.name}</h1>
						<p>{menu.description}</p>
					</div>

					<EditMenuDishes
						menu={menu}
						tempDishes={tempDishes}
						setTempDishes={setTempDishes}
					/>
				</div>

				<Button
					className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-md shadow-lg"
					onClick={handleEditMenu}
				>
					Editar
				</Button>
			</DialogContent>
		</Dialog>
	);
}
