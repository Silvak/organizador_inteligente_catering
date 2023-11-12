'use client';

import { z } from 'zod';
import { useCartStore } from '@/app/cartStore';
import { usePreferencesStore } from '@/app/preferencesStore';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
	ingredients: z
		.array(z.string())
		.refine((value) => value.some((ingredient) => ingredient), {
			message: 'Tienes que seleccionar al menos un ingrediente.',
		}),
});

export default function DishPreferences() {
	const router = useRouter();
	const dish = usePreferencesStore((state) => state.dish);
	const clear = usePreferencesStore((state) => state.clear);
	const addDish = useCartStore((state) => state.addDish);
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			ingredients: [...dish.ingredients],
		},
	});

	function handleAddToCart() {
		addDish({ ...dish, ingredients: [...form.getValues('ingredients')] });
		form.reset();
		router.push('/cart');
	}

	return (
		<div className="w-4/5 m-auto mt-20">
			<div className="flex gap-20 items-center justify-center">
				<div className="flex flex-col gap-8">
					<div>
						<h1 className="text-2xl font-bold">{dish.name}</h1>
						<p>{dish.description}</p>
					</div>

					<Form {...form}>
						<form className="space-y-8">
							<FormField
								control={form.control}
								name="ingredients"
								render={() => (
									<FormItem>
										<div className="mb-4">
											<FormLabel className="text-base font-semibold">
												Ingredientes
											</FormLabel>
										</div>
										{dish.ingredients.map((ingredient) => (
											<FormField
												key={ingredient}
												control={form.control}
												name="ingredients"
												render={({ field }) => {
													return (
														<FormItem
															key={ingredient}
															className="flex flex-row items-start space-x-3 space-y-0"
														>
															<FormControl>
																<Checkbox
																	className="data-[state=checked]:bg-red-500 rounded-full"
																	checked={field.value?.includes(ingredient)}
																	onCheckedChange={(checked) => {
																		return checked
																			? field.onChange([
																					...field.value,
																					ingredient,
																			  ])
																			: field.onChange(
																					field.value?.filter(
																						(value) => value !== ingredient
																					)
																			  );
																	}}
																/>
															</FormControl>
															<FormLabel className="font-normal">
																{ingredient}
															</FormLabel>
														</FormItem>
													);
												}}
											/>
										))}
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</div>

				<div className="">
					<Image
						src={dish.image}
						alt={dish.name}
						width={500}
						height={500}
						className="rounded-2xl"
					/>
				</div>
			</div>

			<div className="flex flex-col space-y-2 items-end mt-10">
				<p className="text-red-500 font-bold">${dish.price}</p>
				<Button
					className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-md shadow-lg"
					onClick={handleAddToCart}
				>
					Agregar al carrito
				</Button>
			</div>
		</div>
	);
}
