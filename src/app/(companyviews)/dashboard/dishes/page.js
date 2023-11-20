'use client';
import DashboardDishesSection from '@/components/DashboardDishesSection';
import DashboardMenusSection from '@/components/DashboardMenusSection';
import { getEnterprise } from '@/services/user.services';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export default function Page() {
	const { data: session } = useSession();
	const { data, status } = useQuery({
		queryKey: ['company', session?.user?.user?.enterprise[0]],
		queryFn: getEnterprise(session?.user?.user?.enterprise[0]),
		select: (data) => data?.data,
		enabled: !!session?.user?.user?.enterprise[0],
	});

	return (
		<div className="space-y-8">
			<DashboardDishesSection companyDishes={data?.dishes} status={status} />

			<DashboardMenusSection companyMenus={data?.menuDish} status={status} />
		</div>
	);
}
