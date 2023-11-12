import { Card, CardContent, CardHeader } from './ui/card';
import { Eye } from 'lucide-react';

export default function DashboardOrderCard({ order }) {
	return (
		<Card className="rounded-3xl shadow-xl p-2">
			<CardHeader className="p-2 pb-1">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-semibold text-gray-700">{order.user}</h2>

					<div className="flex gap-2 items-center">
						<Eye className="text-red-500" />
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-2 pt-1">
				<p className="text-gray-700">
					{new Date(order.created_at).toLocaleDateString()}
				</p>
			</CardContent>
		</Card>
	);
}
