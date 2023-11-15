'use client';

import CompaniesSection from '@/components/CompaniesSection';
import DishesSection from '@/components/DishesSection';
import MenusSection from '@/components/MenusSection';
import Search from '@/components/search';
import useDebounce from '@/hooks/useDebounce';
import { useState } from 'react';

export default function Page() {
	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search, 500);
	const limit = 6;

	return (
		<main className="space-y-12">
			<Search search={search} setSearch={setSearch} />

			<div className=" space-y-8">
				<DishesSection limit={limit} search={debouncedSearch} />
				<MenusSection limit={limit} search={debouncedSearch} />
				<CompaniesSection />
			</div>
		</main>
	);
}
