'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Loader2, MapPin, User } from 'lucide-react';
import { getImgSrc } from '@/lib/utils';
import { useToast } from './ui/use-toast';
import UploadImageOnModal from './UploadImageOnModal';
import { uploadDishImage } from '@/services/dish.services';
import { editEnterprise, uploadCompanyImage } from '@/services/user.services';

const editCompanySchema = z.object({
	title: z.string().min(2, 'Name must contain at least 2 characters'),
	address: z.string({ required_error: 'Address number is required' }),
	image: z.any(),
});

export default function CompanyEditForm({ company, setIsOpen }) {
	const form = useForm({
		resolver: zodResolver(editCompanySchema),
		defaultValues: {
			title: company.title,
			address: company.address,
		},
	});
	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { mutate, status } = useMutation({
		mutationFn: editEnterprise(company._id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['companies'] });
		},
	});

	function onSubmit(companyData) {
		mutate(
			{
				title: companyData.title,
				address: companyData.address,
			},
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
							await uploadCompanyImage(company._id, formData);
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
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4 justify-center"
			>
				{/* <UploadImageOnModal
							form={form}
							currentImage={
								company.img != 'no-posee-imagen'
									? getImgSrc('company', company.img)
									: undefined
							}
						/> */}

				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold text-gray-600 text-base">
								Nombre
							</FormLabel>
							<FormControl>
								<div className="flex items-center">
									<Input
										placeholder="Establezca el nombre de su empresa"
										type="text"
										className="bg-white dark:bg-blue-200/10 border-x-0 border-t-0 border-b-1 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 focus-visible:ring-offset-0 pl-8"
										{...field}
									/>
									<User className="text-gray-400 absolute" />
								</div>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="address"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold text-gray-600 text-base">
								Dirección
							</FormLabel>
							<FormControl>
								<div className="flex items-center">
									<Input
										placeholder="Establezca la dirección de su empresa"
										type="text"
										className="bg-white dark:bg-blue-200/10 border-x-0 border-t-0 border-b-1 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 focus-visible:ring-offset-0 pl-8"
										{...field}
									/>
									<MapPin className="text-gray-400 absolute" />
								</div>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

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
	);
}
