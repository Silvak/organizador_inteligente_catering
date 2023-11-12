'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

const SidebarLink = ({ href, icon, text }) => (
	<li className="text-white p-2 hover:bg-gray-200 cursor-pointer">
		<Link href={href} className="flex items-center">
			<img src={icon} alt={text} className="w-5 h-5 mr-2" />
			{text}
		</Link>
	</li>
);

export default function Sidebar() {
	const userName = 'Usuario Ejemplo';

	const handleLogout = () => {
		console.log('Logout clicked');
	};

	return (
		<nav className="h-[76vh] w-64 bg-gradient-to-b from-red-500 via-orange-500 to-yellow-500 shadow-lg overflow-y-auto rounded-tr-lg rounded-br-lg flex flex-col justify-between">
			<div>
				<div>
					<div className="flex items-end justify-start h-12 text-white pl-4">
						<div className="text-3xl font-bold">Logo</div>
					</div>

					<div className="flex flex-col items-start overflow-y-auto pl-4 pt-6">
						<div className="flex items-center mb-4">
							<Avatar className="cursor-pointer mr-4 w-16 h-16">
								<AvatarImage src="https://github.com/shadcn.png" />
								<AvatarFallback>{userName.charAt(0)}</AvatarFallback>
							</Avatar>
							<div>
								<p className="text-white">{userName}</p>
								<Link
									href="/editar-perfil"
									className="text-white cursor-pointer"
								>
									Editar perfil
								</Link>
							</div>
						</div>

						<ul className="flex flex-col mt-4 cursor-pointer">
							<SidebarLink
								href="/home"
								icon="/assets/mdi_house.png"
								text="Home"
							/>
							<SidebarLink
								href="/cart"
								icon="/assets/mdi_cart.png"
								text="Carrito"
							/>
						</ul>
					</div>
				</div>
			</div>

			<div className="flex flex-col mt-auto p-4">
				<Button
					onClick={handleLogout}
					className="text-white p-2 text-base font-semibold rounded cursor-pointer flex gap-2 items-center"
					variant="ghost"
				>
					<LogOut />
					Log Out
				</Button>
			</div>
		</nav>
	);
}
