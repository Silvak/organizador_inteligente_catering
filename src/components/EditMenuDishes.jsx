import Image from 'next/image';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './ui/accordion';
import SelectMenuDishesIngredients from './SelectMenuDishesIngredients';
import { getImgSrc } from '@/lib/utils';

export default function EditMenuDishes({ menu, tempDishes, setTempDishes }) {
	return (
		<Accordion type="single" collapsible className="space-y-2">
			{menu.dishes.map((dish) => (
				<AccordionItem
					value={dish.title}
					key={dish._id}
					className=" shadow-lg px-4 rounded-lg"
				>
					<AccordionTrigger className="hover:no-underline">
						<div>
							<div className="flex gap-4">
								<Image
									src={getImgSrc('dish', dish.img)}
									alt={dish.title}
									width={200}
									height={200}
									className="rounded-2xl border w-1/4"
								/>
								<div className="w-1/2 space-y-2 text-gray-700 text-start">
									<h1 className="text-lg font-semibold">{dish.title}</h1>
									<p>{dish.description}</p>
								</div>
							</div>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<div className="w-1/2 space-y-2 text-gray-700">
							<SelectMenuDishesIngredients
								dish={dish}
								defaultValues={tempDishes
									.filter((d) => d._id == dish._id)[0]
									.ingredients.map((i) => i._id)}
								setDishes={setTempDishes}
							/>
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
