'use client';

import { getImgSrc } from '@/lib/utils';
import { getEnterprise } from '@/services/user.services';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Skeleton } from './ui/skeleton';

export default function DashboardHeader() {
	const { data: session, status } = useSession();
	const { data: companyData, status: companyStatus } = useQuery({
		queryKey: ['company', session?.user?.user.enterprise[0]],
		queryFn: getEnterprise(session?.user?.user.enterprise[0]),
		enabled: !!session?.user?.user.enterprise[0],
		select: (data) => data?.data,
	});
	return (
		<div className="rounded-2xl p-8 shadow-xl bg-[#F86260]">
			{companyStatus === 'pending' ? (
				<div className="flex gap-2 items-center w-1/3">
					<Skeleton className="rounded-full h-20 w-20 bg-gray-300" />
					<div className="space-y-4 flex-grow">
						<Skeleton className="h-4 w-full bg-gray-300" />
						<Skeleton className="h-4 w-full bg-gray-300" />
					</div>
				</div>
			) : (
				<div className="flex gap-4">
					<Image
						src={getImgSrc('enterprise', companyData?.img)}
						alt={companyData?.title}
						width={300}
						height={300}
						className="rounded-full h-20 w-20"
					/>
					<div>
						<h1 className="text-xl font-semibold text-white">
							{companyData?.title}
						</h1>
						<p className="text-base text-white">{companyData?.address}</p>
					</div>
				</div>
			)}
		</div>
	);
}
