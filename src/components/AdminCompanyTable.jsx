'use client';

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { Card, CardContent, CardFooter } from './ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';
import { companiesColumns } from './CompaniesColumns';
import { getCompanies } from '@/services/user.services';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Pagination from './Pagination';
import { Skeleton } from './ui/skeleton';

const companies = [
	{
		id: '1',
		name: 'Company 1',
		dishes: 5,
		menus: 5,
	},
	{
		id: '2',
		name: 'Company 1',
		dishes: 5,
		menus: 5,
	},
	{
		id: '3',
		name: 'Company 1',
		dishes: 5,
		menus: 5,
	},
	{
		id: '4',
		name: 'Company 1',
		dishes: 5,
		menus: 5,
	},
	{
		id: '5',
		name: 'Company 1',
		dishes: 5,
		menus: 5,
	},
	{
		id: '6',
		name: 'Company 1',
		dishes: 5,
		menus: 5,
	},
	{
		id: '7',
		name: 'Company 1',
		dishes: 5,
		menus: 5,
	},
];

export default function AdminCompanyTable() {
	const [pageNumber, setPageNumber] = useState(1);
	const [limit, setLimit] = useState(3);
	const onPageChange = (page) => setPageNumber(page);

	const { data, status } = useQuery({
		queryKey: ['companies', pageNumber, limit, 'COMPANY_ROLE'],
		queryFn: () =>
			getCompanies({
				limit,
				offset: pageNumber,
				term: 'COMPANY_ROLE',
			}),
	});

	const table = useReactTable({
		data: companies,
		columns: companiesColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<Card>
			<CardContent>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} className="text-center">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className=" w-1/5 text-center">
											{flexRender(cell.column.columnDef.cell, {
												...cell.getContext(),
											})}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={companiesColumns.length}
									className="h-24 text-center"
								>
									<h4 className="text-lg font-semibold">
										You do not have any company yet
									</h4>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter>
				{status == 'success' && (
					<Pagination
						currentPage={pageNumber}
						siblingCount={2}
						totalPageCount={data?.paginating.totalpages}
						onPageChange={onPageChange}
					/>
				)}
			</CardFooter>
		</Card>
	);
}
