'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
	{ name: 'Platillos', href: '/dashboard/dishes' },
	{
		name: 'Pedidos Pendientes',
		href: '/dashboard/orders/pending',
	},
	{ name: 'Pedidos Completados', href: '/dashboard/orders/completed' },
];

export default function DashboardNavbar() {
	const path = usePathname();
	return (
		<nav className="w-4/5 m-auto mt-8 rounded-xl shadow-xl p-2 flex text-center">
			{links.map((link) => (
				<Link
					href={link.href}
					key={link.name}
					className={clsx('flex-1', {
						'text-red-500': path == link.href,
					})}
				>
					{link.name}
				</Link>
			))}
		</nav>
	);
}
