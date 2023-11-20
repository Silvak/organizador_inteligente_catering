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
