'use client';

import { useCartStore } from '../../cartStore';
import CartDishCard from '@/components/CartDihsCard';
import CartMenuCard from '@/components/CartMenuCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Cart() {
	const dishes = useCartStore((state) => state.dishes);
	const menus = useCartStore((state) => state.menus);
	const router = useRouter();

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
									<CartDishCard key={dish._id} dish={dish} />
								))}
							</div>
						</section>
					)}

					{menus.length > 0 && (
						<section>
							<h2 className="text-lg font-semibold text-red-500 mb-2">Menus</h2>

							<div>
								{menus.map((menu) => (
									<CartMenuCard key={menu._id} menu={menu} />
								))}
							</div>
						</section>
					)}
				</>
			)}

			<div className="flex justify-end">
				<Button
					className="bg-red-500 hover:bg-red-500"
					onClick={() => router.push('/summary')}
				>
					Hacer oferta
				</Button>
			</div>
		</div>
	);
}
