'use client';

import { useState } from 'react';
import DashboardProductSkeleton from './DashboardProductSkeleton';
import Pagination from './Pagination';
import DashboardMenuCard from './DashboardMenuCard';
import CreateMenuDialog from './CreateMenuDialog';
import { paginate } from '@/lib/utils';

export default function DashboardMenusSection({ companyMenus, status }) {
	const [pageNumber, setPageNumber] = useState(1);
	const pageSize = 2;
	const onPageChange = (page) => setPageNumber(page);
	const menus = paginate(companyMenus, pageSize, pageNumber);
	const totalPageCount = Math.ceil(companyMenus?.length / pageSize);

	return (
		<section className="space-y-4">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-semibold">Menus</h2>
				<CreateMenuDialog />
			</div>
			{status === 'pending' ? (
				<DashboardProductSkeleton />
			) : (
				<>
					<div className="space-y-4">
						{menus?.map((menu) => (
							<DashboardMenuCard key={menu._id} menu={menu} />
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
