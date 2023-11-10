'use client';

import { useCartStore } from '@/app/cartStore';
import { usePreferencesStore } from '@/app/preferencesStore';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { useState } from 'react';
import SelectIngredients from '@/components/SelectIngredients';

export default function DishPreferences() {
	const router = useRouter();
	const menu = usePreferencesStore((state) => state.menu);
	const clear = usePreferencesStore((state) => state.clear);
	const [tempDishes, setTempDishes] = useState([...menu.dishes]);
	const addMenu = useCartStore((state) => state.addMenu);

	function handleAddToCart() {
		addMenu({ ...menu, dishes: [...tempDishes] });
		clear();
		router.push('/cart');
	}

	return (
		<div className="w-4/5 m-auto mt-20">
			<div className="flex gap-20 items-center justify-center">
				<div className="flex flex-col gap-8 w-full">
					<div>
						<h1 className="text-2xl font-bold">{menu.name}</h1>
						<p>{menu.description}</p>
					</div>

					<Accordion type="single" collapsible className="space-y-2">
						{menu.dishes.map((dish) => (
							<AccordionItem
								value={dish.name}
								key={dish.name}
								className=" shadow-lg"
							>
								<AccordionTrigger className="hover:no-underline">
									<div>
										<div className="flex gap-4">
											<Image
												src={dish.image}
												alt={dish.name}
												width={200}
												height={200}
												className="rounded-2xl border w-1/4"
											/>
											<div className="w-1/2 space-y-2 text-gray-700 text-start">
												<h1 className="text-lg font-semibold">{dish.name}</h1>
												<p>{dish.description}</p>
											</div>
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<div className="w-1/2 space-y-2 text-gray-700">
										<SelectIngredients
											dish={dish}
											defaultValues={
												tempDishes.filter((d) => d.id == dish.id)[0].ingredients
											}
											setDishes={setTempDishes}
										/>
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>

				{/* <div className="">
					<Image
						src={dish.image}
						alt={dish.name}
						width={500}
						height={500}
						className="rounded-2xl"
					/>
				</div> */}
			</div>

			<div className="flex flex-col space-y-2 items-end mt-10">
				{/* <p className="text-red-500 font-bold">${dish.price}</p> */}
				<Button
					className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-md shadow-lg"
					onClick={handleAddToCart}
				>
					Agregar al carrito
				</Button>
			</div>
		</div>
	);
}
