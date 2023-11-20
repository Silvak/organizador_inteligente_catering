import React, { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Search } from 'lucide-react';
import useDebounce from '@/hooks/useDebounce';
import SelectDishCard from './SelectDishCard';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from './ui/skeleton';
import { getDishes } from '@/services/dish.services';

export default function SelectMenuDishes({
	setSelectedDishes,
	selectedDishes,
}) {
	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search, 500);
	const limit = 1;

	const { data: dishesData, status: dishesStatus } = useQuery({
		queryKey: ['dishes', limit, debouncedSearch],
		queryFn: () =>
			getDishes({
				limit,
				term: debouncedSearch,
			}),
	});

	function toggleSelected(dishSelected) {
		setSelectedDishes((prev) => {
			if (prev.some((d) => d._id == dishSelected._id)) {
				return prev.filter((d) => d._id != dishSelected._id);
			} else {
				return [...prev, dishSelected];
			}
		});
	}

	return (
		<section>
			<div className="w-full space-y-2">
				<div className="flex items-center gap-4 ">
					<div className="flex items-center gap-2 w-full">
						<Input
							type="text"
							id="search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="focus-visible:ring-1 h-fit p-1"
						/>
						<Label htmlFor="search">
							<Search className="text-gray-400" />
						</Label>
					</div>
				</div>
				<div className="flex flex-col items-center">
					{dishesStatus == 'pending' ? (
						<div className="flex items-center space-x-6 justify-center my-2 w-3/4">
							<Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
							<div className="space-y-4 w-full">
								<Skeleton className="h-3 w-full  bg-gray-300" />
								<Skeleton className="h-3 w-full  bg-gray-300" />
							</div>
						</div>
					) : dishesData?.dishes.length > 0 ? (
						dishesData?.dishes?.map((dish) => (
							<SelectDishCard
								key={dish._id}
								dish={dish}
								onClick={toggleSelected}
								selected={selectedDishes.some((d) => d._id == dish._id)}
							/>
						))
					) : (
						<p className="text-gray-400 text-center">
							No se encontraron platos con ese nombre
						</p>
					)}
				</div>
			</div>
		</section>
	);
}
