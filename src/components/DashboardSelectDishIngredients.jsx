import React, { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Search } from 'lucide-react';
import useDebounce from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from './ui/skeleton';
import { getIngredients } from '@/services/ingredients.services';
import SelectIngredientCard from './SelectIngredienCard';

export default function DashboardSelectDishIngredients({
	setSelectedIngredients,
	selectedIngredients,
}) {
	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search, 500);
	const limit = 1;

	const { data: ingredientsData, status: ingredientsStatus } = useQuery({
		queryKey: ['ingredients', limit, debouncedSearch],
		queryFn: () =>
			getIngredients({
				limit,
				term: debouncedSearch,
			}),
	});

	function toggleSelected(ingredientSelected) {
		setSelectedIngredients((prev) => {
			if (prev.some((i) => i._id == ingredientSelected._id)) {
				return prev.filter((i) => i._id != ingredientSelected._id);
			} else {
				return [...prev, ingredientSelected];
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
							className="focus-visible:ring-1 h-fit p-1 border-2 border-gray-200"
						/>
						<Label htmlFor="search">
							<Search className="text-gray-400" />
						</Label>
					</div>
				</div>
				<div className="flex flex-col items-center">
					{ingredientsStatus == 'pending' ? (
						<div className="flex items-center space-x-6 justify-center my-2 w-3/4">
							<Skeleton className="h-12 w-12 rounded-full bg-gray-300" />
							<div className="space-y-4 w-full">
								<Skeleton className="h-3 w-full  bg-gray-300" />
								<Skeleton className="h-3 w-full  bg-gray-300" />
							</div>
						</div>
					) : ingredientsData?.ingredients.length > 0 ? (
						ingredientsData?.ingredients?.map((ingredient) => (
							<SelectIngredientCard
								key={ingredient._id}
								ingredient={ingredient}
								onClick={toggleSelected}
								selected={selectedIngredients.some(
									(i) => i._id == ingredient._id
								)}
							/>
						))
					) : (
						<p className="text-gray-400 text-center">
							No se encontraron ingredientes con ese nombre
						</p>
					)}
				</div>
			</div>
		</section>
	);
}
