'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from './ui/card';
import { Eye } from 'lucide-react';

export default function DashboardOrderCard({ order }) {
	const router = useRouter();
	return (
		<Card className="rounded-3xl shadow-xl p-2">
			<CardHeader className="p-2 pb-1">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-semibold text-gray-700">
						{order.person[0].name}
					</h2>

					<div className="flex gap-2 items-center">
						<Eye
							className="text-red-500 cursor-pointer"
							onClick={() => router.push(`/orders/${order._id}`)}
						/>
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-2 pt-1">
				<p className="text-gray-700">
					{new Date(order.emitDate).toLocaleDateString()}
				</p>
			</CardContent>
		</Card>
	);
}
