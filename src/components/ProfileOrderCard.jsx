'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from './ui/card';
import { Eye } from 'lucide-react';

export default function ProfileOrderCard({ order }) {
	const router = useRouter();
	const dishesPrice = order.dishes.reduce((acc, dish) => acc + dish.price, 0);
	const menusPrice =
		order.menus?.reduce(
			(a, menu) => menu.dishes.reduce((acc, dish) => acc + dish.price, 0),
			0
		) ?? 0;

	const totalPrice = dishesPrice + menusPrice;

	return (
		<Card className="rounded-3xl shadow-xl p-2">
			<CardHeader className="p-2 pb-1">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-semibold text-gray-700">
						{order.company}
					</h2>

					<div className="flex gap-2 items-center">
						<Eye
							className="text-red-500"
							onClick={() => router.push(`/orders/${order.id}`)}
						/>
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-2 pt-1 space-y-2">
				<p className="text-gray-700">
					{new Date(order.created_at).toLocaleDateString()}
				</p>
				<p className="text-red-500 font-bold">${totalPrice}</p>
			</CardContent>
		</Card>
	);
}
