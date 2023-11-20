import { Card, CardContent, CardHeader } from './ui/card';
import EditDishDialog from './EditDishDialog';
import DeleteDishDialog from './DeleteDishDialog';

export default function DashboardDishCard({ dish }) {
	return (
		<Card className="rounded-3xl shadow-xl p-2">
			<CardHeader className="p-2 pb-1">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-semibold text-gray-700">{dish.title}</h2>

					<div className="flex gap-2 items-center">
						<EditDishDialog dish={dish} />
						<DeleteDishDialog id={dish._id} />
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-2 pt-1">
				<p className="text-gray-700">{dish.description}</p>
			</CardContent>
		</Card>
	);
}
