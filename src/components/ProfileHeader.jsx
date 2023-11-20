'use client';

import { useSession } from 'next-auth/react';
import { Skeleton } from './ui/skeleton';
import Image from 'next/image';
import { getPerson } from '@/services/user.services';
import { useQuery } from '@tanstack/react-query';
import { getImgSrc } from '@/lib/utils';

export default function ProfileHeader() {
	const { data: session, status } = useSession();
	const { data: personData, status: personStatus } = useQuery({
		queryKey: ['person', session?.user?.user.person[0]],
		queryFn: getPerson(session?.user?.user.person[0]),
		select: (data) => data.data,
		enabled: !!session?.user?.user.person[0],
	});

	return (
		<div className="flex gap-4 bg-[#F86260] rounded-2xl p-8 shadow-xl">
			{personStatus === 'pending' ? (
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
						src={getImgSrc('person', personData?.img)}
						alt={personData?.name}
						width={300}
						height={300}
						className="rounded-full h-20 w-20"
					/>
					<div>
						<h1 className="text-xl font-semibold text-white">
							{personData?.name}
						</h1>
						<p className="text-base text-white">{personData?.cellphone}</p>
					</div>
				</div>
			)}
		</div>
	);
}
