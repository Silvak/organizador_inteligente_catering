import DeleteMenuDialog from './DeleteMenuDialog';
import EditMenuDialog from './EditMenuDialog';
import { Card, CardContent, CardHeader } from './ui/card';

export default function DashboardMenuCard({ menu }) {
	return (
		<Card className="rounded-3xl shadow-xl p-2">
			<CardHeader className="p-2 pb-1">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-semibold text-gray-700">{menu.name}</h2>

					<div className="flex gap-2 items-center">
						<EditMenuDialog menu={menu} />
						<DeleteMenuDialog id={menu._id} />
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-2 pt-1">
				<p className="text-gray-700">{menu.description}</p>
			</CardContent>
		</Card>
	);
}
