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
import { Eye, Loader2, Pencil } from 'lucide-react';
import { getImgSrc } from '@/lib/utils';
import { useToast } from './ui/use-toast';
import UploadImageOnModal from './UploadImageOnModal';
import { editDish, uploadDishImage } from '@/services/dish.services';
import DishForm from './DishForm';

const editDishSchema = z.object({
	name: z.string().min(2, 'Name must contain at least 2 characters'),
	description: z
		.string()
		.min(2, 'Description must contain at least 2 characters'),
	price: z.coerce.number().min(0.01, 'Price must be greater than 0.01'),
	image: z.any(),
});

export default function EditDishDialog({ dish }) {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm({
		resolver: zodResolver(editDishSchema),
		defaultValues: {
			name: dish.name,
			description: dish.description,
			price: dish.price,
		},
	});
	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { mutate, status } = useMutation({
		mutationFn: editDish(dish._id),
		onSuccess: () => {
			queryClient.invalidateQueries('dishes');
			setIsOpen(false);
		},
	});

	function onSubmit(dishData) {
		mutate(
			{ ...dishData, image: undefined },
			{
				onSuccess: async () => {
					try {
						if (dishData?.image) {
							const formData = new FormData();
							formData.append('image', dishData.image, dishData.image.name);
							await uploadDishImage(dish._id, formData);
						}
						toast({ title: 'Plato editado' });
						form.reset();
						setIsOpen(false);
					} catch (error) {
						toast({
							title: 'Error editando imagen de plato',
							variant: 'destructive',
						});
						console.log(error);
					}
				},
				onError: (error) => {
					toast({ title: 'Error editando plato', variant: 'destructive' });
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
				<Button className="bg-transparent text-black hover:bg-slate-300 dark:text-slate-200">
					<Eye className="h-7 w-7 text-red-500" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<h2 className="text-[1.563rem] w-full text-center font-semibold">
						Editar plato
					</h2>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-2 justify-center"
					>
						<UploadImageOnModal
							form={form}
							currentImage={
								dish.img != 'no-posee-imagen'
									? getImgSrc('dish', dish.img)
									: undefined
							}
						/>

						<DishForm form={form} />

						<Button
							type="submit"
							className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-xl"
							disabled={status == 'pending'}
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
			</DialogContent>
		</Dialog>
	);
}
