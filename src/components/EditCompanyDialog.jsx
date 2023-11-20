'use client';

import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from './ui/dialog';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { getEnterprise } from '@/services/user.services';
import CompanyEditForm from './CompanyEditForm';

export default function EditCompanyDialog({ id }) {
	const { data, status: companyStatus } = useQuery({
		queryKey: ['company', id],
		queryFn: getEnterprise(id),
	});

	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog
			open={isOpen}
			onOpenChange={() =>
				setIsOpen((prev) => (status == 'pending' ? prev : !prev))
			}
		>
			<DialogTrigger asChild>
				<Button className="bg-transparent text-black hover:bg-slate-300 dark:text-slate-200">
					<Pencil className=" text-red-500" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<h2 className="text-[1.563rem] w-full text-center font-semibold">
						Editar empresa
					</h2>
				</DialogHeader>

				{companyStatus == 'success' && (
					<CompanyEditForm company={data?.data} setIsOpen={setIsOpen} />
				)}
			</DialogContent>
		</Dialog>
	);
}
