'use client';

import {
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';
import { companiesColumns } from './CompaniesColumns';

export default function AdminCompanyTable({ companies }) {
	const table = useReactTable({
		data: companies,
		columns: companiesColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
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
	);
}
