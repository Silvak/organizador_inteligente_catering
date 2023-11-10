import CompanyRegisterForm from '@/components/CompanyRegisterForm';
import Link from 'next/link';

function Register() {
	return (
		<div className="my-10 flex items-center justify-center">
			<div className="w-full lg:max-w-[600px]">
				<h1 className="font-bold text-4xl text-red-500 sm:text-2xl mb-8">
					Crear cuenta
				</h1>
				<CompanyRegisterForm />
				<div className="flex justify-center mt-6 text-sm">
					<span className="mr-1 text-gray-500">¿Ya tienes una cuenta?</span>
					<Link href="/login" className="text-red-500 hover:underline">
						Inicia sesión
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Register;
