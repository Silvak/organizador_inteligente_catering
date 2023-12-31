'use client';

import { useCartStore } from '@/app/cartStore';
import { usePreferencesStore } from '@/app/preferencesStore';
import { Button } from '@/components/ui/button';

import { useRouter } from 'next/navigation';

import { useState } from 'react';
import EditMenuDishes from '@/components/EditMenuDishes';

export default function DishPreferences() {
	const router = useRouter();
	const menu = usePreferencesStore((state) => state.menu);

	const [tempDishes, setTempDishes] = useState([...menu.dishes]);
	const addMenu = useCartStore((state) => state.addMenu);

	function handleAddToCart() {
		addMenu({ ...menu, dishes: [...tempDishes] });
		router.push('/cart');
	}

	return (
		<div className="w-4/5 m-auto mt-20">
			<div className="flex gap-20 items-center justify-center">
				<div className="flex flex-col gap-8 w-full">
					<div>
						<h1 className="text-2xl font-bold">{menu.title}</h1>
						<p>{menu.description}</p>
					</div>

					<EditMenuDishes
						menu={menu}
						tempDishes={tempDishes}
						setTempDishes={setTempDishes}
					/>
				</div>
			</div>

			<div className="flex flex-col space-y-2 items-end mt-10">
				{/* <p className="text-red-500 font-bold">${dish.price}</p> */}
				<Button
					className="bg-[#F86260] hover:bg-red-500 rounded-md shadow-lg"
					onClick={handleAddToCart}
				>
					Agregar al carrito
				</Button>
			</div>
		</div>
	);
}
