'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
	{ name: 'Empresas', href: '/admin/dashboard/companies' },
	{
		name: 'Ingredientes',
		href: '/admin/dashboard/ingredients',
	},
];

export default function AdminNavbar() {
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
