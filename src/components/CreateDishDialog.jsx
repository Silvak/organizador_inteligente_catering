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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import UploadImageOnModal from './UploadImageOnModal';
import { useToast } from './ui/use-toast';
import { Loader2, X } from 'lucide-react';
import DishForm from './DishForm';
import { createDish, uploadDishImage } from '@/services/dish.services';
import DashboardSelectDishIngredients from './DashboardSelectDishIngredients';
import { useSession } from 'next-auth/react';
import { getEnterprise } from '@/services/user.services';

const createDishSchema = z
	.object({
		title: z.string().min(2, 'Name must contain at least 2 characters'),
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
	const { data: session, status: sessionStatus } = useSession();
	const { data: companyData, status: companyStatus } = useQuery({
		queryKey: ['company', session?.user?.user.enterprise[0]],
		queryFn: getEnterprise(session?.user?.user.enterprise[0]),
		enabled: !!session?.user?.user.enterprise[0],
		select: (data) => data?.data,
	});

	const [isOpen, setIsOpen] = useState(false);
	const form = useForm({
		resolver: zodResolver(createDishSchema),
		defaultValues: {
			title: '',
			description: '',
			price: '',
		},
	});
	const { toast } = useToast();
	const [selectedIngredients, setSelectedIngredients] = useState([]);

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
				title: dishData.title,
				description: dishData.description,
				price: dishData.price,
				ingredients: selectedIngredients.map((i) => i._id),
				enterpriseId: companyData._id,
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

					form.reset();
					setIsOpen(false);
					toast({ title: 'Plato agregado' });
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
				<Button className="bg-[#F86260] hover:bg-red-500">Agregar Plato</Button>
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

						<section className="space-y-2">
							<p className="text-sm font-semibold">Ingredientes</p>
							<div className="flex gap-2 flex-wrap my-2">
								{selectedIngredients.map((ingredient) => (
									<div
										className="flex bg-gray-300 rounded-3xl gap-1 py-1 px-2"
										key={ingredient._id}
									>
										<p className="text-xs">{ingredient.title}</p>
										<X
											className="h-4 w-4 cursor-pointer"
											onClick={() =>
												setSelectedIngredients((prev) => {
													return prev.filter((i) => i._id != ingredient._id);
												})
											}
										/>
									</div>
								))}
							</div>

							<DashboardSelectDishIngredients
								selectedIngredients={selectedIngredients}
								setSelectedIngredients={setSelectedIngredients}
							/>
						</section>

						<Button
							type="submit"
							className="w-full bg-[#F86260] hover:bg-red-500"
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
