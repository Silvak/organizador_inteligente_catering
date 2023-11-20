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
import { ingredientsColumns } from './IngredientsColumns';

export default function AdminIngredientsTable({ ingredients }) {
	const table = useReactTable({
		data: ingredients,
		columns: ingredientsColumns,
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
								No hay ningún ingrediente
							</h4>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
