'use client';

import { useState } from 'react';
import DashboardProductSkeleton from './DashboardProductSkeleton';
import CreateDishDialog from './CreateDishDialog';
import DashboardDishCard from './DashboardDishCard';
import Pagination from './Pagination';
import { paginate } from '@/lib/utils';

export default function DashboardDishesSection({ companyDishes, status }) {
	const [pageNumber, setPageNumber] = useState(1);
	const pageSize = 3;
	const onPageChange = (page) => setPageNumber(page);

	const dishes = paginate(companyDishes, pageSize, pageNumber);
	const totalPageCount = Math.ceil(companyDishes?.length / pageSize);

	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold">Platos</h2>
				<CreateDishDialog />
			</div>
			{status === 'pending' ? (
				<DashboardProductSkeleton />
			) : (
				<>
					<div className="space-y-4">
						{dishes.map((dish) => (
							<DashboardDishCard key={dish._id} dish={dish} />
						))}
					</div>
					{status == 'success' && (
						<Pagination
							currentPage={pageNumber}
							siblingCount={2}
							totalPageCount={totalPageCount}
							onPageChange={onPageChange}
						/>
					)}
				</>
			)}
		</section>
	);
}
