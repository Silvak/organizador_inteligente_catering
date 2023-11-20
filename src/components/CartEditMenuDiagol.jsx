'use client';

import { Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { useCartStore } from '@/app/cartStore';
import { useState } from 'react';
import EditMenuDishes from './EditMenuDishes';
import { useQuery } from '@tanstack/react-query';
import { getMenu } from '@/services/dish.services';

export default function CartEditMenuDialog({ menu }) {
	// when backend ready, get dish from backend, and get default ingredients from store or props
	const [open, setOpen] = useState(false);
	const [tempDishes, setTempDishes] = useState([...menu.dishes]);
	const editMenu = useCartStore((state) => state.editMenu);

	const { data, status } = useQuery({
		queryKey: ['menu', menu._id],
		queryFn: () => getMenu(menu._id),
		select: (data) => data?.data,
	});

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
						<h1 className="text-2xl font-bold">{menu.title}</h1>
						<p>{menu.description}</p>
					</div>

					<EditMenuDishes
						menu={data}
						tempDishes={tempDishes}
						setTempDishes={setTempDishes}
					/>
				</div>

				<Button
					className="bg-[#F86260] hover:bg-red-500 rounded-md shadow-lg"
					onClick={handleEditMenu}
				>
					Editar
				</Button>
			</DialogContent>
		</Dialog>
	);
}
