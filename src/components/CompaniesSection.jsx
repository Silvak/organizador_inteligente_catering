'use client';

import { useQuery } from '@tanstack/react-query';
import ProductsSkeletons from './ProductsSkeletons';
import { Pagination } from '@tanstack/react-table';
import MenuCard from './MenuCard';
import { getCompanies } from '@/services/user.services';
import CompanyCard from './CompanyCard';

const companyExample = {
	_id: '1',
	name: 'Yummy',
	image: '/images/yummy.png',
	description: 'description',
};

export default function CompaniesSection() {
	const limit = 6;

	const { data: companiesData, status: companiesStatus } = useQuery({
		queryKey: ['companies', limit],
		queryFn: () =>
			getCompanies({
				limit,
			}),
	});

	return (
		<section>
			<h1 className="text-gray-700 text-2xl font-bold">Empresas</h1>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pt-8">
				{companiesStatus == 'pending' ? (
					<ProductsSkeletons />
				) : (
					<>
						{companiesStatus == 'success' &&
							companiesData?.companies?.map((company) => (
								<CompanyCard key={company._id} company={company} />
							))}
						<CompanyCard company={companyExample} />
					</>
				)}
			</div>
		</section>
	);
}
