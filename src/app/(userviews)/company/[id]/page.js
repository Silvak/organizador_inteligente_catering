'use client';

import CompanyCard from '@/components/CompanyCard';
import DishesSection from '@/components/DishesSection';
import MenusSection from '@/components/MenusSection';
import { getUser } from '@/services/user.services';
import { useQuery } from '@tanstack/react-query';

export default function Page({ params }) {
	const { id } = params;
	const { data, status } = useQuery({
		queryKey: ['company', id],
		queryFn: getUser(id),
	});

	return (
		<div>
			<div>
				<CompanyCard company={data?.data} />
			</div>

			<div>
				<DishesSection limit={6} search={data?.data.name} />
				<MenusSection limit={6} search={data?.data.name} />
			</div>
		</div>
	);
}
