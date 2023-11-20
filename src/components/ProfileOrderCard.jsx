'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from './ui/card';
import { Eye } from 'lucide-react';
import { Button } from './ui/button';

export default function ProfileOrderCard({ order }) {
	const router = useRouter();

	return (
		<Card className="rounded-3xl shadow-xl p-2">
			<CardHeader className="p-2 pb-1">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-semibold text-gray-700">
						{order.enterprise[0].title}
					</h2>

					<Button variant="ghost">
						<Eye
							className="text-red-500 cursor-pointer"
							onClick={() => router.push(`/orders/${order._id}`)}
						/>
					</Button>
				</div>
			</CardHeader>
			<CardContent className="p-2 pt-1 space-y-2">
				<p className="text-gray-700">
					{new Date(order.emitDate).toLocaleDateString()}
				</p>
				<p className="text-red-500 font-bold">${order.totalCost}</p>
			</CardContent>
		</Card>
	);
}
