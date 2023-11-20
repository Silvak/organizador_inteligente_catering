import AdminCompanyData from '@/components/AdminCompanyData';
import CreateCompanyDialog from '@/components/CreateCompanyDialog';

export default function Page() {
	return (
		<div>
			<div className="flex justify-between items-center my-4">
				<h1 className="text-2xl font-bold text-red-500">Empresas asociadas</h1>
				<CreateCompanyDialog />
			</div>

			<div>
				<AdminCompanyData />
			</div>
		</div>
	);
}
