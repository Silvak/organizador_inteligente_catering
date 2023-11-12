'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from './ui/dialog';
import { Form } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import UploadImageOnModal from './UploadImageOnModal';
import { useToast } from './ui/use-toast';
import { Loader2 } from 'lucide-react';
import DishForm from './DishForm';
import { createDish, uploadDishImage } from '@/services/dish.services';

const createDishSchema = z
	.object({
		name: z.string().min(2, 'Name must contain at least 2 characters'),
		description: z
			.string()
			.min(2, 'Description must contain at least 2 characters'),
		price: z.coerce.number().min(0.01, 'Price must be greater than 0.01'),
		image: z.any(),
	})
	.refine((data) => !!data.image, {
		path: ['image'],
		message: 'You need to provide an image',
	});

export default function CreateDishDialog() {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm({
		resolver: zodResolver(createDishSchema),
		defaultValues: {
			name: '',
			description: '',
			price: '',
		},
	});
	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { mutate, status } = useMutation({
		mutationFn: createDish,
		onSuccess: () => {
			queryClient.invalidateQueries('dishes');
		},
	});

	function onSubmit(dishData) {
		mutate(
			{
				name: dishData.name,
				description: dishData.description,
				price: dishData.price,
			},
			{
				onSuccess: async (data) => {
					try {
						const formData = new FormData();
						formData.append('image', dishData.image, dishData.image.name);
						await uploadDishImage(data.data._id, formData);
					} catch (e) {
						toast({
							title: 'Error al agregar la imagen del plato',
							variant: 'destructive',
						});
						console.log(e);
					}
				},
				onError: (error) => {
					toast({
						title: 'Error al agregar el plato',
						variant: 'destructive',
					});
					console.log(error);
				},
			}
		);
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={() =>
				setIsOpen((prev) => (status == 'pending' ? prev : !prev))
			}
		>
			<DialogTrigger asChild>
				<Button className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
					Agregar Plato
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="mb-2">
					<h2 className="text-[1.563rem] w-full text-center font-semibold">
						Agregar Plato
					</h2>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-2 justify-center"
					>
						<UploadImageOnModal form={form} />

						<DishForm form={form} />

						<Button
							type="submit"
							className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
							disabled={status == 'pending'}
						>
							{status == 'pending' ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Espera por favor
								</>
							) : (
								'Agregar'
							)}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
