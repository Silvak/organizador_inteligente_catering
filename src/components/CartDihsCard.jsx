import CartDeleteDishDialog from './CartDeleteDishDialog';
import CartEditDishDialog from './CartEditDishDialog';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

export default function CartDishCard({ dish }) {
	return (
		<Card className="rounded-3xl shadow-xl">
			<CardHeader className="pb-2">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-semibold text-gray-700">{dish.title}</h2>

					<div className="flex gap-2 items-center">
						<CartEditDishDialog dish={dish} />

						<CartDeleteDishDialog id={dish._id} />
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
	);
}
