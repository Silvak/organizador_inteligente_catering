import AdminIngredientsData from '@/components/AdminIngredientsData';
import CreateIngredientDialog from '@/components/CreateIngredientDialog';

export default function Page() {
	return (
		<div>
			<div className="flex justify-between items-center my-4">
				<h1 className="text-2xl font-bold text-red-500">Ingredientes</h1>
				<CreateIngredientDialog />
			</div>

			<div>
				<AdminIngredientsData />
			</div>
		</div>
	);
}
