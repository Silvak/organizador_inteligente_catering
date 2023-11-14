'use client';

import * as z from 'zod';

import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from './ui/dialog';
import { useState } from 'react';
import CompanyRegisterForm from './CompanyRegisterForm';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from './ui/form';
import UploadImageOnModal from './UploadImageOnModal';
import { Loader2 } from 'lucide-react';
import { signUp } from '@/services/user.services';
import { useMutation } from '@tanstack/react-query';

const registerSchema = z
	.object({
		name: z.string().min(2, 'Name must contain at least 2 characters'),
		email: z.string().email(),
		phone: z.string({ required_error: 'Phone number is required' }),
		password: z
			.string()
			.min(8, 'Password must contain at least 8 characters')
			.max(32),
		image: z.any(),

		// passwordConfirm: z.string(),
		// termsAndConditions: z.boolean(),
	})
	.refine((data) => !!data.image, {
		path: ['image'],
		message: 'You need to provide an image',
	});
// .refine((data) => data.password === data.passwordConfirm, {
// 	path: ['passwordConfirm'],
// 	message: 'Passwords must match',
// })
// .refine((data) => data.termsAndConditions === true, {
// 	path: ['termsAndConditions'],
// 	message: 'You need to accept terms and conditions',
// });

export default function CreateCompanyDialog() {
	const [isOpen, setIsOpen] = useState(false);

	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			address: '',
			// passwordConfirm: '',
			// termsAndConditions: false,
			phone: '',
		},
	});

	const { mutate, status } = useMutation({
		mutationFn: signUp,
	});

	const { toast } = useToast();

	function onSubmit(companyData) {
		mutate(
			{
				...companyData,
				// passwordConfirm: undefined,
				// termsAndConditions: undefined,
				rol: 'COMPANY_ROLE',
			},
			{
				onSuccess: async (data) => {
					try {
						const formData = new FormData();
						formData.append('image', companyData.image, companyData.image.name);
						await uploadDishImage(data.data._id, formData);
					} catch (e) {
						toast({
							title: 'Error al agregar la imagen de la empresa',
							variant: 'destructive',
						});
						console.log(e);
					}
				},
				onError: (e) => {
					//handle error
					toast({ title: 'Error creando empresa', variant: 'destructive' });
					console.log(e);
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
				<Button className="bg-[#F86260]">Agregar Empresa</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="mb-2">
					<h2 className="text-[1.563rem] w-full text-center font-semibold">
						Agregar Empresa
					</h2>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<UploadImageOnModal form={form} />

						<CompanyRegisterForm form={form} />

						<Button
							type="submit"
							className="w-full bg-[#F86260] hover:bg-red-500 mt-8  rounded-md"
						>
							{status == 'pending' ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Espera por favor
								</>
							) : (
								'Registrar Empresa'
							)}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
