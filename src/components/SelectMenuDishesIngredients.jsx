'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { Checkbox } from './ui/checkbox';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

const FormSchema = z.object({
	ingredients: z
		.array(z.string())
		.refine((value) => value.some((ingredient) => ingredient), {
			message: 'Tienes que seleccionar al menos un ingrediente.',
		}),
});

export default function SelectMenuDishesIngredients({
	dish,
	defaultValues,
	setDishes,
}) {
	const { watch, ...form } = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			ingredients: [...defaultValues],
		},
	});

	useEffect(() => {
		const subscription = watch((value) => {
			setDishes((prev) =>
				prev.map((d) =>
					d.id == dish.id ? { ...d, ingredients: value.ingredients } : d
				)
			);
		});
		return () => subscription.unsubscribe();
	}, [watch, dish.id, setDishes]);

	return (
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
																? field.onChange([...field.value, ingredient])
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
	);
}
