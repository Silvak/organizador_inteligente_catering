'use client';

import CompanyCard from '@/components/CompanyCard';
import CompanyDishes from '@/components/CompanyDishes';
import CompanyMenus from '@/components/CompanyMenus';
import ProductsSkeletons from '@/components/ProductsSkeletons';
import { getEnterprise, getUser } from '@/services/user.services';
import { useQuery } from '@tanstack/react-query';

export default function Page({ params }) {
	const { id } = params;
	const { data, status } = useQuery({
		queryKey: ['company', id],
		queryFn: getEnterprise(id),
		select: (data) => data?.data,
	});

	return status == 'pending' ? (
		<ProductsSkeletons />
	) : (
		<div>
			<div>
				<CompanyCard company={data} />
			</div>

			<div className="space-y-8">
				<CompanyDishes companyDishes={data?.dishes} status={status} />
				<CompanyMenus companyMenus={data?.menuDish} status={status} />
			</div>
		</div>
	);
}
