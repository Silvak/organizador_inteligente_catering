import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { getImgSrc } from '@/lib/utils';
import Image from 'next/image';

export default function OrderDishAccordion({ dishes }) {
	return (
		<Accordion type="single" collapsible className="space-y-2">
			{dishes.map((dish) => (
				<AccordionItem
					value={dish._id}
					key={dish._id}
					className=" shadow-lg rounded-xl px-4 pt-4"
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
							<h1 className="text-lg font-semibold">Ingredientes</h1>
							<ul>
								{dish.ingredients.map((ingredient) => (
									<p key={ingredient._id}>{ingredient.title}</p>
								))}
							</ul>
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
