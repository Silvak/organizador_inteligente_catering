import { Checkbox } from './ui/checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';

export default function SelectDishIngredients({ dish, form }) {
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
