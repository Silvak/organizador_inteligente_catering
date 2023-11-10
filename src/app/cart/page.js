'use client';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { useCartStore } from '../cartStore';
import { Eye, Trash } from 'lucide-react';

export default function Cart() {
	const dishes = useCartStore((state) => state.dishes);
	const menus = useCartStore((state) => state.menus);

	return (
		<div className="w-4/5 m-auto mt-20 space-y-8">
			<h1 className="text-2xl font-bold text-red-500">Carrito</h1>

			{dishes.length == 0 && menus.length == 0 ? (
				<div>
					<h2 className="text-lg font-semibold text-gray-700">
						Your cart is empty
					</h2>
				</div>
			) : (
				<section>
					<div className="space-y-4">
						{dishes.map((dish) => (
							<Card key={dish.id} className="rounded-3xl shadow-xl">
								<CardHeader className="pb-2">
									<div className="flex justify-between items-center">
										<h2 className="text-lg font-semibold text-gray-700">
											{dish.name}
										</h2>

										<div className="flex gap-2 items-center">
											<Eye className="text-red-500 cursor-pointer h-7 w-7" />
											<Trash className="text-red-500 cursor-pointer" />
										</div>
									</div>
								</CardHeader>
								<CardContent className="pb-2">
									<p className="text-gray-700">{dish.description}</p>
								</CardContent>
								<CardFooter>
									<p className="text-red-500 font-bold">${dish.price}</p>
								</CardFooter>
							</Card>
						))}
					</div>
					<div>
						{menus.map((menu) => (
							<Card key={menu.id}>
								<CardHeader>
									<div>
										<h1>{menu.name}</h1>
									</div>
								</CardHeader>
								<CardContent>
									<p>{menu.description}</p>
								</CardContent>
								<CardFooter>
									<p>{menu.price}</p>
								</CardFooter>
							</Card>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
