import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

export default function Login() {
	return (
		<div className="h-screen flex items-center justify-center">
			<div className="w-full lg:max-w-[600px]">
				<h1 className="font-bold text-4xl text-red-500 sm:text-2xl mb-8">
					Iniciar sesión
				</h1>
				<LoginForm />
				<div className="flex justify-center mt-6 text-sm">
					<span className="mr-1 text-gray-500">¿No tienes una cuenta?</span>
					<Link href="/register" className="text-red-500 hover:underline">
						Crear cuenta
					</Link>
				</div>
			</div>
		</div>
	);
}
