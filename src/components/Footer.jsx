import { Link } from 'lucide-react';
import React from 'react';

export default function Footer() {
	return (
		<section className="flex justify-center text-white items-center w-full border-t border-gray-300/60 bg-gradient-to-r from-yellow-500 to-red-500">
			<div className="grid grid-cols-1 lg:grid-cols-3 h-full w-full max-w-[1250px] pt-8 pb-2 lg:gap-x-[290px] gap-y-12 lg:gap-y-0 gap-32">
				{/* Primera columna */}
				<div className="flex flex-col items-center justify-start text-sm lg:mb-8">
					<ul>
						<li className="cursor-pointer mb-2">Politicas de privacidad</li>
						<li className="cursor-pointer mb-2">Terminos y condiciones</li>
						<li className="cursor-pointer">Seguridad</li>
					</ul>
				</div>

				{/* Segunda columna */}
				<div className="flex flex-col items-center justify-start text-sm ml-4">
					{/* Puedes reemplazar la siguiente línea con tu logo */}
					<h1 className="mb-2">LOGO</h1>
					<p>email@example.com</p>
					<p className="mt-16 ">2023 LOGO All right reserved</p>
				</div>

				{/* Tercera columna */}
				<div className="flex flex-col items-center justify-start text-sm">
					<ul>
						<li className="cursor-pointer mb-2">Home</li>
						<li className="cursor-pointer mb-2">Empresas</li>
						<li className="cursor-pointer">Carrito</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
