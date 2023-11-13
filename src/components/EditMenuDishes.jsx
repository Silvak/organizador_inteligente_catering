import Image from 'next/image';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './ui/accordion';
import SelectMenuDishesIngredients from './SelectMenuDishesIngredients';

export default function EditMenuDishes({ menu, tempDishes, setTempDishes }) {
	return (
		<Accordion type="single" collapsible className="space-y-2">
			{menu.dishes.map((dish) => (
				<AccordionItem value={dish.name} key={dish.name} className=" shadow-lg">
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
							<SelectMenuDishesIngredients
								dish={dish}
								defaultValues={
									tempDishes.filter((d) => d.id == dish.id)[0].ingredients
								}
								setDishes={setTempDishes}
							/>
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
