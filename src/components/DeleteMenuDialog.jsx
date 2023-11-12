'use client';

import { useState } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog';
import { Trash } from 'lucide-react';
import { Button } from './ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './ui/use-toast';
import { deleteMenu } from '@/services/dish.services';

export default function DeleteMenuDialog({ id }) {
	const [isOpen, setIsOpen] = useState(false);
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: deleteMenu(id),
		onSuccess: () => {
			queryClient.invalidateQueries('products');
		},
	});
	const { toast } = useToast();

	function handleDelete() {
		mutate(undefined, {
			onSuccess: () => {
				setIsOpen(false);
				toast({
					title: 'El menu ha sido eliminado correctamente',
					status: 'success',
				});
			},
			onError: (error) => {
				toast({
					title: 'Ha ocurrido un error al eliminar el menu',
					status: 'error',
				});
				console.log(error);
			},
		});
	}

	return (
		<AlertDialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
			<AlertDialogTrigger asChild>
				<Button className="bg-transparent text-black hover:bg-slate-300 dark:text-slate-200">
					<Trash className="text-red-500" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Estas seguro de que deseas eliminar este menu?
					</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
					<AlertDialogAction
						className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl"
						onClick={handleDelete}
					>
						Eliminar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
