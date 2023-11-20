'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Loader2, Utensils } from 'lucide-react';
import { Button } from './ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './ui/use-toast';
import { editIngredient } from '@/services/ingredients.services';

const registerSchema = z.object({
	title: z.string().min(2, 'Name must contain at least 2 characters'),
});

export default function EditIngredientForm({ ingredient, setIsOpen }) {
	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			title: ingredient.title,
		},
	});

	const { mutate, status } = useMutation({
		mutationFn: editIngredient(ingredient._id),
	});

	const queryClient = useQueryClient();

	const { toast } = useToast();

	function onSubmit(ingredientData) {
		mutate(
			{
				title: ingredientData.title,
			},
			{
				onSuccess: async () => {
					form.reset();
					setIsOpen(false);
					toast({ title: 'Ingrediente creado' });
					queryClient.invalidateQueries({ queryKey: ['ingredients'] });
				},
				onError: (e) => {
					//handle error
					toast({ title: 'Error creando ingrediente', variant: 'destructive' });
					console.log(e);
				},
			}
		);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold text-gray-600 text-base">
								Nombre
							</FormLabel>
							<FormControl>
								<div className="flex items-center">
									<Input
										placeholder="Establezca el nombre del ingrediente"
										type="text"
										className="bg-white dark:bg-blue-200/10 border-x-0 border-t-0 border-b-1 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 focus-visible:ring-offset-0 pl-8"
										{...field}
									/>
									<Utensils className="text-gray-400 absolute" />
								</div>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					className="w-full bg-[#F86260] hover:bg-red-500 mt-8  rounded-md"
				>
					{status == 'pending' ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Espera por favor
						</>
					) : (
						'Editar'
					)}
				</Button>
			</form>
		</Form>
	);
}
