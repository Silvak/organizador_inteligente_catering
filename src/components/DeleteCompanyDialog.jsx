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
import { deleteCompany } from '@/services/user.services';

export default function DeleteCompanyDialog({ id }) {
	const [isOpen, setIsOpen] = useState(false);
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: deleteCompany(id),
		onSuccess: () => {
			queryClient.invalidateQueries('companies');
		},
	});
	const { toast } = useToast();

	function handleDelete() {
		mutate(undefined, {
			onSuccess: () => {
				setIsOpen(false);
				toast({
					title: 'La empresa ha sido eliminado correctamente',
					status: 'success',
				});
			},
			onError: (error) => {
				toast({
					title: 'Ha ocurrido un error al eliminar la empresa',
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
						Estas seguro de que deseas eliminar esta empresa?
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
