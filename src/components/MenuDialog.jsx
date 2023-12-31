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
import { useCartStore } from '@/app/cartStore';
import { usePreferencesStore } from '@/app/preferencesStore';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import { getImgSrc } from '@/lib/utils';

export default function MenuDialog({ menu, open, setOpen }) {
	const addMenu = useCartStore((state) => state.addMenu);
	const setMenu = usePreferencesStore((state) => state.setMenu);
	const router = useRouter();
	const { toast } = useToast();

	function handleAddMenu(menu) {
		addMenu(menu);
		toast({ title: 'Menu agregado al carrito' });
	}

	function handlePreferences(menu) {
		setMenu(menu);
		router.push('/preferences/menu');
	}

	const menuPrice = menu.dishes.reduce((acc, dish) => acc + dish.price, 0);

	return (
		<Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
			<DialogContent className="sm:rounded-3xl space-y-2">
				<div className="flex gap-4">
					<Image
						src={getImgSrc('menuDish', menu.img)}
						alt={menu.title}
						width={300}
						height={300}
						className="rounded-2xl border w-1/2"
					/>
					<div className="w-1/2 space-y-2 text-gray-700">
						<h1 className="text-lg font-semibold">{menu.title}</h1>
						<p>{menu.description}</p>
					</div>
				</div>

				<div className="space-y-2 text-gray-700">
					<h1 className="text-lg font-semibold">Platos</h1>
					<ul>
						<Accordion type="single" collapsible className="space-y-2">
							{menu.dishes.map((dish) => (
								<AccordionItem
									value={dish.title}
									key={dish._id}
									className=" shadow-lg px-2 rounded-lg"
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
													<h1 className="text-lg font-semibold">
														{dish.title}
													</h1>
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
					</ul>
				</div>
				<div className="flex justify-between items-center">
					<p className="text-red-500 font-bold">${menuPrice}</p>
					<ShoppingCart
						className="text-red-500 h-7 w-7 cursor-pointer"
						onClick={() => handleAddMenu(menu)}
					/>
				</div>
				<Button
					className="bg-[#F86260] hover:bg-red-500 w-full rounded-md shadow-lg"
					onClick={() => handlePreferences(menu)}
				>
					Preferencias
				</Button>
			</DialogContent>
		</Dialog>
	);
}
