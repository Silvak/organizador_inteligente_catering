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
import { Loader2, Pencil } from 'lucide-react';
import { getImgSrc } from '@/lib/utils';
import { useToast } from './ui/use-toast';
import UploadImageOnModal from './UploadImageOnModal';
import { uploadDishImage } from '@/services/dish.services';
import { editCompany, getCompany } from '@/services/user.services';
import CompanyRegisterForm from './CompanyRegisterForm';

const editCompanySchema = z.object({
	name: z.string().min(2, 'Name must contain at least 2 characters'),
	email: z.string().email(),
	phone: z.string({ required_error: 'Phone number is required' }),
	image: z.any(),
});

const company = {
	_id: '60b8f2c7b1d4c80015b7f7a0',
	name: 'Empresa 1',
};

export default function EditCompanyDialog({ id }) {
	const { data, status: companyStatus } = useQuery({
		queryKey: ['company', id],
		queryFn: getCompany(id),
	});
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm({
		resolver: zodResolver(editCompanySchema),
		defaultValues: {},
	});
	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { mutate, status } = useMutation({
		mutationFn: editCompany(company._id),
		onSuccess: () => {
			queryClient.invalidateQueries('companies');
			setIsOpen(false);
		},
	});

	function onSubmit(companyData) {
		mutate(
			{ ...companyData, image: undefined },
			{
				onSuccess: async () => {
					try {
						if (companyData?.image) {
							const formData = new FormData();
							formData.append(
								'image',
								companyData.image,
								companyData.image.name
							);
							await uploadDishImage(dish._id, formData);
						}
						toast({ title: 'empresa editada' });
						form.reset();
						setIsOpen(false);
					} catch (error) {
						toast({
							title: 'Error editando imagen de empresa',
							variant: 'destructive',
						});
						console.log(error);
					}
				},
				onError: (error) => {
					toast({ title: 'Error editando empresa', variant: 'destructive' });
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
					<Pencil className=" text-red-500" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<h2 className="text-[1.563rem] w-full text-center font-semibold">
						Editar empresa
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
								company.img != 'no-posee-imagen'
									? getImgSrc('company', company.img)
									: undefined
							}
						/>

						<CompanyRegisterForm form={form} />

						<Button
							type="submit"
							className="w-full bg-[#F86260] rounded-xl"
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
