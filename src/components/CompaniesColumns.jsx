import EditCompanyDialog from './EditCompanyDialog';
import DeleteCompanyDialog from './DeleteCompanyDialog';

export const companiesColumns = [
	{
		accessorKey: 'title',
		header: 'Nombre',
		cell: ({ row }) => (
			<p className=" text-slate-700 text-sm lg:text-base min-w-[8rem]">
				{row.getValue('title')}
			</p>
		),
	},
	{
		accessorKey: 'dishes',
		header: 'Platos a la carta',
		cell: ({ row }) => (
			<p className=" text-slate-700 text-sm lg:text-base">
				{row.getValue('dishes').length}
			</p>
		),
	},
	{
		accessorKey: 'menuDish',
		header: 'Menus a la carta',
		cell: ({ row }) => (
			<p className=" text-slate-700 text-sm lg:text-base">
				{row.getValue('menuDish').length}
			</p>
		),
	},
	{
		accessorKey: '_id',
		header: 'Actions',
		cell: (info) => {
			return (
				<div className="flex items-center gap-1 justify-center">
					<EditCompanyDialog id={info.row.getValue('_id')} />
					<DeleteCompanyDialog id={info.row.getValue('_id')} />
				</div>
			);
		},
	},
];
