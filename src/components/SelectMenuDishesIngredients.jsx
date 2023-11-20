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
					d._id == dish._id
						? {
								...d,
								ingredients: dish.ingredients.filter((i) =>
									value.ingredients.includes(i._id)
								),
						  }
						: d
				)
			);
		});
		return () => subscription.unsubscribe();
	}, [watch, dish._id, setDishes, dish.ingredients]);

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
									key={ingredient._id}
									control={form.control}
									name="ingredients"
									render={({ field }) => {
										return (
											<FormItem
												key={ingredient._id}
												className="flex flex-row items-start space-x-3 space-y-0"
											>
												<FormControl>
													<Checkbox
														className="data-[state=checked]:bg-red-500 rounded-full"
														checked={field.value?.includes(ingredient._id)}
														onCheckedChange={(checked) => {
															return checked
																? field.onChange([
																		...field.value,
																		ingredient._id,
																  ])
																: field.onChange(
																		field.value?.filter(
																			(value) => value !== ingredient._id
																		)
																  );
														}}
													/>
												</FormControl>
												<FormLabel className="font-normal">
													{ingredient.title}
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
