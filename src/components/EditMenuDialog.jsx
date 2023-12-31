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
import { Eye, Loader2, Pencil, X } from 'lucide-react';
import { getImgSrc } from '@/lib/utils';
import { useToast } from './ui/use-toast';
import UploadImageOnModal from './UploadImageOnModal';
import { editMenu, uploadMenuImage } from '@/services/dish.services';
import MenuForm from './MenuForm';
import SelectMenuDishes from './SelectMenuDishes';

const editMenuSchema = z.object({
	title: z.string().min(2, 'Name must contain at least 2 characters'),
	description: z
		.string()
		.min(2, 'Description must contain at least 2 characters'),
	image: z.any(),
});

export default function EditMenuDialog({ menu }) {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm({
		resolver: zodResolver(editMenuSchema),
		defaultValues: {
			title: menu.title,
			description: menu.description,
			price: menu.price,
		},
	});
	const { toast } = useToast();
	const [selectedDishes, setSelectedDishes] = useState([...menu.dishes]);

	const queryClient = useQueryClient();

	const { mutate, status } = useMutation({
		mutationFn: editMenu(menu._id),
		onSuccess: () => {
			queryClient.invalidateQueries('menus');
			setIsOpen(false);
		},
	});

	function onSubmit(menuData) {
		mutate(
			{ ...menuData, image: undefined },
			{
				onSuccess: async () => {
					try {
						if (menuData?.image) {
							const formData = new FormData();
							formData.append('image', menuData.image, menuData.image.name);
							await uploadMenuImage(menu._id, formData);
						}
						toast({ title: 'Menu editado' });
						form.reset();
						setIsOpen(false);
					} catch (error) {
						toast({
							title: 'Error editando imagen de menu',
							variant: 'destructive',
						});
						console.log(error);
					}
				},
				onError: (error) => {
					toast({ title: 'Error editando menu', variant: 'destructive' });
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
						Editar menu
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
								menu.img != 'no-posee-imagen'
									? getImgSrc('menuDish', menu.img)
									: undefined
							}
						/>

						<MenuForm form={form} />

						<section className="space-y-2">
							<p className="text-sm font-semibold">Platos</p>
							<div className="flex gap-2 flex-wrap my-2">
								{selectedDishes.map((dish) => (
									<div
										className="flex bg-gray-300 rounded-3xl gap-1 py-1 px-2"
										key={dish._id}
									>
										<p className="text-xs">{dish.title}</p>
										<X
											className="h-4 w-4 cursor-pointer"
											onClick={() =>
												setSelectedDishes((prev) => {
													return prev.filter((d) => d._id != dish._id);
												})
											}
										/>
									</div>
								))}
							</div>

							<SelectMenuDishes
								selectedDishes={selectedDishes}
								setSelectedDishes={setSelectedDishes}
							/>
						</section>

						<Button
							type="submit"
							className="w-full bg-[#F86260] hover:bg-red-500 rounded-xl"
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
