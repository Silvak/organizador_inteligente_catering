'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/services/user.services';
import { useRouter } from 'next/navigation';
import { Checkbox } from './ui/checkbox';
import { useToast } from './ui/use-toast';
import { Loader2, LockKeyhole, Mail, MapPin, Phone, User } from 'lucide-react';

const registerSchema = z
	.object({
		name: z.string().min(2, 'Name must contain at least 2 characters'),
		email: z.string().email(),
		phone: z.string({ required_error: 'Phone number is required' }),
		password: z
			.string()
			.min(8, 'Password must contain at least 8 characters')
			.max(32),
		passwordConfirm: z.string(),
		termsAndConditions: z.boolean(),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		path: ['passwordConfirm'],
		message: 'Passwords must match',
	})
	.refine((data) => data.termsAndConditions === true, {
		path: ['termsAndConditions'],
		message: 'You need to accept terms and conditions',
	});

/**
 * The RegisterForm function is a React component that renders a form for user registration, including
 * fields for display name, email, password, password confirmation, age, skin type, gender, and
 * acceptance of terms and conditions.
 */
export default function CompanyRegisterForm() {
	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			address: '',
			passwordConfirm: '',
			termsAndConditions: false,
			phone: '',
		},
	});

	const { mutate, status } = useMutation({
		mutationFn: signUp,
	});

	const router = useRouter();
	const { toast } = useToast();

	function onSubmit(userData) {
		mutate(
			{
				...userData,
				passwordConfirm: undefined,
				termsAndConditions: undefined,
				rol: 'COMPANY_ROLE',
			},
			{
				onSuccess: () => {
					// handle success
					toast({ title: 'Usuario creado' });
					router.push('/login');
				},
				onError: (e) => {
					//handle error
					toast({ title: 'Error creando usuario', variant: 'destructive' });
					console.log(e);
				},
			}
		);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
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
										className="bg-white dark:bg-blue-200/10 border-x-0 border-t-0 border-b-1 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 pl-8"
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
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold text-gray-600 text-base">
								Correo Electrónico
							</FormLabel>
							<FormControl>
								<div className="flex items-center">
									<Input
										placeholder="Establezca su dirección de correo electrónico"
										type="email"
										className="bg-white dark:bg-blue-200/10 border-x-0 border-t-0 border-b-1 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 pl-8"
										{...field}
									/>
									<Mail className="text-gray-400 absolute" />
								</div>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold text-gray-600 text-base">
								Numero de Teléfono
							</FormLabel>
							<FormControl>
								<div className="flex items-center">
									<Input
										placeholder="Establezca su numero de teléfono"
										type="text"
										className="bg-white dark:bg-blue-200/10 border-x-0 border-t-0 border-b-1 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 pl-8"
										{...field}
									/>
									<Phone className="text-gray-400 absolute" />
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
										className="bg-white dark:bg-blue-200/10 border-x-0 border-t-0 border-b-1 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 pl-8"
										{...field}
									/>
									<MapPin className="text-gray-400 absolute" />
								</div>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold text-gray-600 text-base">
								Contraseña
							</FormLabel>
							<FormControl>
								<div className="flex items-center">
									<Input
										placeholder="Establezca su contraseña"
										type="password"
										className="bg-white dark:bg-blue-200/10 border-x-0 border-t-0 border-b-1 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 pl-8"
										{...field}
									/>
									<LockKeyhole className="text-gray-400 absolute" />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="passwordConfirm"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold text-gray-600 text-base">
								Confirma contraseña
							</FormLabel>
							<FormControl>
								<div className="flex items-center">
									<Input
										placeholder="Confirme su contraseña"
										type="password"
										className="bg-white dark:bg-blue-200/10 border-x-0 border-t-0 border-b-1 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 pl-8"
										{...field}
									/>
									<LockKeyhole className="text-gray-400 absolute" />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div>
					<FormField
						control={form.control}
						name="termsAndConditions"
						render={({ field }) => (
							<FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
								<FormControl>
									<Checkbox
										checked={field.value}
										onCheckedChange={field.onChange}
									/>
								</FormControl>
								<div className="space-y-1 leading-none">
									<FormLabel>Aceptar los términos y condiciones</FormLabel>
								</div>
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" className="w-full bg-[#F86260] mt-8  rounded-md">
					{status == 'pending' ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Espera por favor
						</>
					) : (
						'Registrarse'
					)}
				</Button>
			</form>
		</Form>
	);
}
