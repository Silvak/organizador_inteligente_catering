import Image from 'next/image';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from './ui/accordion';
import OrderDishAccordion from '@/app/OrderDishAccordion';
import { getImgSrc } from '@/lib/utils';

export default function OrderMenuAccordion({ menus }) {
	return (
		<Accordion type="single" collapsible className="space-y-2">
			{menus.map((menu) => (
				<AccordionItem
					value={menu._id}
					key={menu.title}
					className=" shadow-lg rounded-xl px-4 pt-4"
				>
					<AccordionTrigger className="hover:no-underline">
						<div>
							<div className="flex gap-4">
								<Image
									src={getImgSrc('menuDish', menu.img)}
									alt={menu.title}
									width={200}
									height={200}
									className="rounded-2xl border w-1/4"
								/>
								<div className="w-1/2 space-y-2 text-gray-700 text-start">
									<h1 className="text-lg font-semibold">{menu.title}</h1>
									<p>{menu.description}</p>
								</div>
							</div>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<div className="w-1/2 space-y-2 text-gray-700">
							<h1 className="text-lg font-semibold">Platos</h1>
							<div>
								<OrderDishAccordion dishes={menu.dishes} />
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
