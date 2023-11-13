'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2, LockKeyhole, Mail } from 'lucide-react';
import { useToast } from './ui/use-toast';
import { useState } from 'react';

// Validation schema
const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

/**
 * The above code is a React component for a login form that handles form submission, displays error
 * messages, and redirects to the home page upon successful login.
 * @returns The `LoginForm` component is returning a form that includes two input fields for email and
 * password, along with a submit button. The form is using the `Form` component from a library called
 * `react-hook-form` to handle form validation and submission. The form also includes some conditional
 * rendering based on the `status` state, which can be "idle" or "pending". If the status is "
 */
function LoginForm() {
	const [status, setStatus] = useState('idle');
	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const router = useRouter();
	const { toast } = useToast();

	async function onSubmit(credentials) {
		setStatus('pending');
		const responseNextAuth = await signIn('credentials', {
			...credentials,
			redirect: false,
		});

		//handle errors
		if (responseNextAuth?.error) {
			console.log(responseNextAuth.error);
			toast({
				title: 'Error',
				message: responseNextAuth.error,
				variant: 'destructive',
			});
			setStatus('idle');
			return;
		}

		//handle success
		router.push('/home');
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold text-gray-600 text-base">
								Correo
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
				<Button
					className="bg-[#F86260] w-full rounded-md shadow-lg"
					type="submit"
				>
					{status == 'pending' ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Espera por favor
						</>
					) : (
						'Iniciar sesión'
					)}
				</Button>
			</form>
		</Form>
	);
}

export default LoginForm;
