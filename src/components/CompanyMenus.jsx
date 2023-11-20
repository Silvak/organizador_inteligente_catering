import { paginate } from '@/lib/utils';
import ProductsSkeletons from './ProductsSkeletons';
import Pagination from './Pagination';
import { useState } from 'react';
import MenuCard from './MenuCard';

export default function CompanyMenus({ companyMenus, status }) {
	const [pageNumber, setPageNumber] = useState(1);
	const pageSize = 2;
	const onPageChange = (page) => setPageNumber(page);
	const menus = paginate(companyMenus, pageSize, pageNumber);
	const totalPageCount = Math.ceil(companyMenus.length / pageSize);

	return (
		<section>
			<h1 className="text-gray-700 text-2xl font-bold">Menus</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 mb-4">
				{status == 'pending' ? (
					<ProductsSkeletons />
				) : (
					<>
						{status == 'success' &&
							menus?.map((menu) => <MenuCard key={menu._id} menu={menu} />)}
					</>
				)}
			</div>
			{status == 'success' && (
				<Pagination
					currentPage={pageNumber}
					siblingCount={2}
					totalPageCount={totalPageCount}
					onPageChange={onPageChange}
				/>
			)}
		</section>
	);
}
