'use client';

import { z } from 'zod';
import { Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCartStore } from '@/app/cartStore';
import { useState } from 'react';
import SelectDishIngredients from './SelectDishIngredients';

const FormSchema = z.object({
	ingredients: z
		.array(z.string())
		.refine((value) => value.some((ingredient) => ingredient), {
			message: 'Tienes que seleccionar al menos un ingrediente.',
		}),
});

export default function CartEditDishDialog({ dish }) {
	// when backend ready, get dish from backend, and get default ingredients from store or props
	const [open, setOpen] = useState(false);
	const editDish = useCartStore((state) => state.editDish);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			ingredients: [...dish.ingredients],
		},
	});

	function handleAddToCart() {
		editDish({ ...dish, ingredients: [...form.getValues('ingredients')] });
		setOpen(false);
	}
	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				setOpen((prev) => !prev);
			}}
		>
			<DialogTrigger asChild>
				<Button variant="ghost">
					<Eye className="text-red-500 h-7 w-7" />
				</Button>
			</DialogTrigger>

			<DialogContent>
				<div className="flex gap-20 items-center justify-center">
					<div className="flex flex-col gap-8">
						<div>
							<h1 className="text-2xl font-bold">{dish.name}</h1>
							<p>{dish.description}</p>
						</div>

						<SelectDishIngredients dish={dish} form={form} />
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

				<Button
					className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-md shadow-lg"
					onClick={handleAddToCart}
				>
					Editar
				</Button>
			</DialogContent>
		</Dialog>
	);
}
