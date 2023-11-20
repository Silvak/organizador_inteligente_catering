import CartDeleteMenuDialog from './CartDeleteMenuDialog';
import CartEditMenuDialog from './CartEditMenuDiagol';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

export default function CartMenuCard({ menu }) {
	return (
		<Card className="rounded-3xl shadow-xl">
			<CardHeader className="pb-2">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-semibold text-gray-700">{menu.title}</h2>

					<div className="flex gap-2 items-center">
						<CartEditMenuDialog menu={menu} />

						<CartDeleteMenuDialog id={menu._id} />
					</div>
				</div>
			</CardHeader>
			<CardContent className="pb-2">
				<p className="text-gray-700">{menu.description}</p>
			</CardContent>
			<CardFooter>
				<p className="text-red-500 font-bold">
					${menu.dishes.reduce((acc, dish) => acc + dish.price, 0)}
				</p>
			</CardFooter>
		</Card>
	);
}
