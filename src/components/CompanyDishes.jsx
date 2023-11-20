import { paginate } from '@/lib/utils';
import ProductsSkeletons from './ProductsSkeletons';
import Pagination from './Pagination';
import DishCard from './DishCard';
import { useState } from 'react';

export default function CompanyDishes({ companyDishes, status }) {
	const [pageNumber, setPageNumber] = useState(1);
	const pageSize = 2;
	const onPageChange = (page) => setPageNumber(page);

	const dishes = paginate(companyDishes, pageSize, pageNumber);
	const totalPageCount = Math.ceil(companyDishes.length / pageSize);

	return (
		<section>
			<h1 className="text-gray-700 text-2xl font-bold">Platos</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8 mb-4">
				{status == 'pending' ? (
					<ProductsSkeletons />
				) : (
					<>
						{status == 'success' &&
							dishes?.map((dish) => <DishCard key={dish._id} dish={dish} />)}
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
