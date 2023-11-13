'use client';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { useCartStore } from '../../cartStore';
import { Eye, Trash } from 'lucide-react';
import CartEditDishDialog from '@/components/CartEditDishDialog';
import CartDishCard from '@/components/CartDihsCard';
import CartMenuCard from '@/components/CartMenuCard';

export default function Cart() {
	const dishes = useCartStore((state) => state.dishes);
	const menus = useCartStore((state) => state.menus);

	return (
		<div className="space-y-8">
			<h1 className="text-2xl font-bold text-red-500">Carrito</h1>

			{dishes.length == 0 && menus.length == 0 ? (
				<div>
					<h2 className="text-lg font-semibold text-gray-700">
						Your cart is empty
					</h2>
				</div>
			) : (
				<>
					{dishes.length > 0 && (
						<section>
							<h2 className="text-lg font-semibold text-red-500 mb-2">
								Dishes
							</h2>
							<div className="space-y-4">
								{dishes.map((dish) => (
									<CartDishCard key={dish.id} dish={dish} />
								))}
							</div>
						</section>
					)}

					{menus.length > 0 && (
						<section>
							<h2 className="text-lg font-semibold text-red-500 mb-2">Menus</h2>

							<div>
								{menus.map((menu) => (
									<CartMenuCard key={menu.id} menu={menu} />
								))}
							</div>
						</section>
					)}
				</>
			)}
		</div>
	);
}
