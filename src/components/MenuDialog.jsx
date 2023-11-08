import Image from 'next/image';
import { Dialog, DialogContent } from './ui/dialog';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './ui/accordion';

const menu = {
	id: '1',
	name: 'Sushi Itto',
	description: 'Sushi, Japonesa',
	image: '/images/katsudon.jpg',
	company: 'Sushi Itto',
	dishes: [
		{
			name: 'Katsudon',
			description: 'Arroz con cerdo empanizado',
			price: 120,
			image: '/images/katsudon.jpg',
			category: 'Japonesa',
			company: 'Sushi Itto',
			ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
		},
		{
			name: 'Sushi',
			description: 'Arroz con cerdo empanizado',
			price: 120,
			image: '/images/katsudon.jpg',
			category: 'Japonesa',
			company: 'Sushi Itto',
			ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
		},
	],
};

export default function MenuDialog({ open, setOpen }) {
	const menuPrice = menu.dishes.reduce((acc, dish) => acc + dish.price, 0);

	return (
		<Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
			<DialogContent className="sm:rounded-3xl space-y-2">
				<div className="flex gap-4">
					<Image
						src={menu.image}
						alt={menu.name}
						width={300}
						height={300}
						className="rounded-2xl border w-1/2"
					/>
					<div className="w-1/2 space-y-2 text-gray-700">
						<h1 className="text-lg font-semibold">{menu.name}</h1>
						<p>{menu.description}</p>
					</div>
				</div>

				<div className="space-y-2 text-gray-700">
					<h1 className="text-lg font-semibold">Platos</h1>
					<ul>
						<Accordion type="single" collapsible className="space-y-2">
							{menu.dishes.map((dish) => (
								<AccordionItem
									value={dish.name}
									key={dish.name}
									className=" shadow-lg"
								>
									<AccordionTrigger className="hover:no-underline">
										<div>
											<div className="flex gap-4">
												<Image
													src={dish.image}
													alt={dish.name}
													width={200}
													height={200}
													className="rounded-2xl border w-1/4"
												/>
												<div className="w-1/2 space-y-2 text-gray-700 text-start">
													<h1 className="text-lg font-semibold">{dish.name}</h1>
													<p>{dish.description}</p>
												</div>
											</div>
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<div className="w-1/2 space-y-2 text-gray-700">
											<h1 className="text-lg font-semibold">Ingredientes</h1>
											<ul>
												{dish.ingredients.map((ingredient) => (
													<p key={ingredient}>{ingredient}</p>
												))}
											</ul>
										</div>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</ul>
				</div>
				<div className="flex justify-between items-center">
					<p className="text-red-500 font-bold">${menuPrice}</p>
					<ShoppingCart className="text-red-500 h-7 w-7" />
				</div>
				<Button className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 w-full rounded-md shadow-lg">
					Preferencias
				</Button>
			</DialogContent>
		</Dialog>
	);
}
