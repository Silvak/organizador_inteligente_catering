import AdminCompanyTable from '@/components/AdminCompanyTable';
import CreateCompanyDialog from '@/components/CreateCompanyDialog';
import { Button } from '@/components/ui/button';

export default function Page() {
	return (
		<div>
			<div className="flex justify-between items-center my-4">
				<h1 className="text-2xl font-bold text-red-500">Empresas asociadas</h1>
				<CreateCompanyDialog />
			</div>

			<div>
				<AdminCompanyTable />
			</div>
		</div>
	);
}
