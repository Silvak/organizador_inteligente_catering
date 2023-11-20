'use client';

import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from './ui/dialog';
import { useState } from 'react';

import { Eye } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

import { getIngredient } from '@/services/ingredients.services';
import EditIngredientForm from './EditIngredientForm';

export default function EditIngredientDialog({ id }) {
	const [isOpen, setIsOpen] = useState(false);

	const { data, status } = useQuery({
		queryKey: ['ingredients', id],
		queryFn: () => getIngredient(id),
		select: (data) => data?.data,
	});

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
				<DialogHeader className="mb-2">
					<h2 className="text-[1.563rem] w-full text-center font-semibold">
						Agregar Ingrediente
					</h2>
				</DialogHeader>

				<EditIngredientForm ingredient={data} setIsOpen={setIsOpen} />
			</DialogContent>
		</Dialog>
	);
}
