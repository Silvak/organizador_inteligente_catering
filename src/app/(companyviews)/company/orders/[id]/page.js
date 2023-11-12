import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const dishes = [
	{
		id: '1',
		name: 'Katsudon',
		description: 'Arroz con cerdo empanizado',
		price: 120,
		image: '/images/katsudon.jpg',
		category: 'Japonesa',
		company: 'Sushi Itto',
		ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
	},
	{
		id: '2',
		name: 'Sushi',
		description: 'Arroz con cerdo empanizado',
		price: 120,
		image: '/images/katsudon.jpg',
		category: 'Japonesa',
		company: 'Sushi Itto',
		ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
	},
	{
		id: '3',
		name: 'Sushi',
		description: 'Arroz con cerdo empanizado',
		price: 120,
		image: '/images/katsudon.jpg',
		category: 'Japonesa',
		company: 'Sushi Itto',
		ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
	},
];

const menus = [
	{
		id: '1',
		name: 'Sushi Itto',
		description: 'Sushi, Japonesa',
		image: '/images/katsudon.jpg',
		company: 'Sushi Itto',
		dishes: [
			{
				id: '1',
				name: 'Katsudon',
				description: 'Arroz con cerdo empanizado',
				price: 120,
				image: '/images/katsudon.jpg',
				category: 'Japonesa',
				company: 'Sushi Itto',
				ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
			},
			{
				id: '2',
				name: 'Sushi',
				description: 'Arroz con cerdo empanizado',
				price: 120,
				image: '/images/katsudon.jpg',
				category: 'Japonesa',
				company: 'Sushi Itto',
				ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
			},
			{
				id: '3',
				name: 'Sushi',
				description: 'Arroz con cerdo empanizado',
				price: 120,
				image: '/images/katsudon.jpg',
				category: 'Japonesa',
				company: 'Sushi Itto',
				ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
			},
		],
	},
	{
		id: '2',
		name: 'Sushi Itto',
		description: 'Sushi, Japonesa',
		image: '/images/katsudon.jpg',
		company: 'Sushi Itto',
		dishes: [
			{
				id: '1',
				name: 'Katsudon',
				description: 'Arroz con cerdo empanizado',
				price: 120,
				image: '/images/katsudon.jpg',
				category: 'Japonesa',
				company: 'Sushi Itto',
				ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
			},
			{
				id: '2',
				name: 'Sushi',
				description: 'Arroz con cerdo empanizado',
				price: 120,
				image: '/images/katsudon.jpg',
				category: 'Japonesa',
				company: 'Sushi Itto',
				ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
			},
			{
				id: '3',
				name: 'Sushi',
				description: 'Arroz con cerdo empanizado',
				price: 120,
				image: '/images/katsudon.jpg',
				category: 'Japonesa',
				company: 'Sushi Itto',
				ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
			},
		],
	},
	{
		id: '3',
		name: 'Sushi Itto',
		description: 'Sushi, Japonesa',
		image: '/images/katsudon.jpg',
		company: 'Sushi Itto',
		dishes: [
			{
				id: '1',
				name: 'Katsudon',
				description: 'Arroz con cerdo empanizado',
				price: 120,
				image: '/images/katsudon.jpg',
				category: 'Japonesa',
				company: 'Sushi Itto',
				ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
			},
			{
				id: '2',
				name: 'Sushi',
				description: 'Arroz con cerdo empanizado',
				price: 120,
				image: '/images/katsudon.jpg',
				category: 'Japonesa',
				company: 'Sushi Itto',
				ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
			},
			{
				id: '3',
				name: 'Sushi',
				description: 'Arroz con cerdo empanizado',
				price: 120,
				image: '/images/katsudon.jpg',
				category: 'Japonesa',
				company: 'Sushi Itto',
				ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
			},
		],
	},
];

export default function Order() {
	return (
		<div className="space-y-8">
			<h1 className="text-2xl font-bold text-red-500">Pedido</h1>

			<section>
				<h2 className="text-xl font-semibold text-red-500">Usuario</h2>
				<p>
					<span className="font-medium">Fecha del pedido:</span>{' '}
					{new Date().toLocaleDateString()}
				</p>
			</section>

			<section className="flex items-center justify-between">
				<div className="text-center">
					<h3 className="font-medium text-lg">Cantidad de personas</h3>
					<p>4</p>
				</div>
				<div className="text-center">
					<h3 className="font-medium text-lg">Fecha de entrega</h3>
					<p>{new Date().toLocaleDateString()}</p>
				</div>

				<Button className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
					Marcar como completada
				</Button>
			</section>

			<section>
				<h2 className="text-xl font-semibold text-red-500">Platos</h2>
				<div>
					<Accordion type="single" collapsible className="space-y-2">
						{dishes.map((dish) => (
							<AccordionItem
								value={dish.id}
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
				</div>
			</section>
			<section>
				<h2 className="text-xl font-semibold text-red-500">Menus</h2>
				<div>
					<Accordion type="single" collapsible className="space-y-2">
						{menus.map((menu) => (
							<AccordionItem
								value={menu.id}
								key={menu.name}
								className=" shadow-lg"
							>
								<AccordionTrigger className="hover:no-underline">
									<div>
										<div className="flex gap-4">
											<Image
												src={menu.image}
												alt={menu.name}
												width={200}
												height={200}
												className="rounded-2xl border w-1/4"
											/>
											<div className="w-1/2 space-y-2 text-gray-700 text-start">
												<h1 className="text-lg font-semibold">{menu.name}</h1>
												<p>{menu.description}</p>
											</div>
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<div className="w-1/2 space-y-2 text-gray-700">
										<h1 className="text-lg font-semibold">Platos</h1>
										<div>
											<Accordion
												type="single"
												collapsible
												className="space-y-2"
											>
												{menu.dishes.map((dish) => (
													<AccordionItem
														value={dish.id}
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
																		<h1 className="text-lg font-semibold">
																			{dish.name}
																		</h1>
																		<p>{dish.description}</p>
																	</div>
																</div>
															</div>
														</AccordionTrigger>
														<AccordionContent>
															<div className="w-1/2 space-y-2 text-gray-700">
																<h1 className="text-lg font-semibold">
																	Ingredientes
																</h1>
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
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</section>
		</div>
	);
}
