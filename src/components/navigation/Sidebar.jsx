'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Home, LayoutDashboard, LogOut, ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

// const SidebarLink = ({ href, icon, text }) => (
// 	<li className="text-white p-2 hover:bg-gray-200 cursor-pointer">
// 		<Link href={href} className="flex items-center">
// 			<img src={icon} alt={text} className="w-5 h-5 mr-2" />
// 			{text}
// 		</Link>
// 	</li>
// );

export default function Sidebar() {
	const { data: session, status } = useSession();
	const { data, userStatus } = useQuery({
		queryKey: ['user', session?.user?.user._id],
		queryFn: () => getUser(session?.user?.user._id),
	});

	const userName = 'Usuario Ejemplo';

	const handleLogout = () => {
		console.log('Logout clicked');
	};

	return (
		<nav className="h-[76vh] w-64 bg-[#F86260] shadow-lg overflow-y-auto rounded-tr-lg rounded-br-lg flex flex-col justify-between">
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
							<Link
								href="/dashboard"
								className="flex items-center text-white p-2 gap-2"
							>
								<Home />
								Home
							</Link>

							<Link
								href="/cart"
								className="flex items-center text-white p-2 gap-2"
							>
								<ShoppingCart />
								Carrito
							</Link>

							{/* {status == 'authenticated' &&
								session?.user?.user?.role == 'COMPANY_ROLE' && ( */}
							<Link
								href="/dashboard/dishes"
								className="flex items-center text-white p-2 gap-2"
							>
								<LayoutDashboard />
								Dashboard
							</Link>
							{/* )} */}
						</ul>
					</div>
				</div>
			</div>

			{status == 'authenticated' && (
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
			)}
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
