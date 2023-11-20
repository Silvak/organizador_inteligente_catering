'use client';

import { z } from 'zod';
import { useCartStore } from '@/app/cartStore';
import { usePreferencesStore } from '@/app/preferencesStore';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectDishIngredients from '@/components/SelectDishIngredients';
import { getImgSrc } from '@/lib/utils';

const FormSchema = z.object({
	ingredients: z
		.array(z.string())
		.refine((value) => value.some((ingredient) => ingredient), {
			message: 'Tienes que seleccionar al menos un ingrediente.',
		}),
});

export default function DishPreferences() {
	const router = useRouter();
	const dish = usePreferencesStore((state) => state.dish);
	const addDish = useCartStore((state) => state.addDish);

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			ingredients: dish.ingredients.map((ingredient) => ingredient._id),
		},
	});

	function handleAddToCart() {
		addDish({ ...dish, ingredients: [...form.getValues('ingredients')] });
		form.reset();
		router.push('/cart');
	}

	return (
		<div className="w-4/5 m-auto mt-20">
			<div className="flex gap-20 items-center justify-center">
				<div className="flex flex-col gap-8">
					<div>
						<h1 className="text-2xl font-bold">{dish.title}</h1>
						<p>{dish.description}</p>
					</div>

					<SelectDishIngredients form={form} dish={dish} />
				</div>

				<div className="">
					<Image
						src={getImgSrc('dish', dish.img)}
						alt={dish.title}
						width={500}
						height={500}
						className="rounded-2xl"
					/>
				</div>
			</div>

			<div className="flex flex-col space-y-2 items-end mt-10">
				<p className="text-red-500 font-bold">${dish.price}</p>
				<Button
					className="bg-[#F86260] hover:bg-red-500 rounded-md shadow-lg"
					onClick={handleAddToCart}
				>
					Agregar al carrito
				</Button>
			</div>
		</div>
	);
}
