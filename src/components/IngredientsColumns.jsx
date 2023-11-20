import DeleteIngredientDialog from './DeleteIngredientDialog';
import EditIngredientDialog from './EditIngredientDialog';

export const ingredientsColumns = [
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
		accessorKey: '_id',
		header: 'Actions',
		cell: (info) => {
			return (
				<div className="flex items-center gap-1 justify-center">
					<EditIngredientDialog id={info.row.getValue('_id')} />
					<DeleteIngredientDialog id={info.row.getValue('_id')} />
				</div>
			);
		},
	},
];
