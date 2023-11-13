import DashboardNavbar from '@/components/DashboardNavbar';

export default function Layout({ children }) {
	return (
		<>
			<div className="flex gap-4 bg-[#F86260] rounded-2xl p-8 shadow-xl">
				<div className="h-20 w-20 rounded-full bg-gray-500"></div>
				<div>
					<h1 className="text-xl font-semibold text-white">Empresa</h1>
					<p className="text-base text-white">Descripción</p>
				</div>
			</div>

			<DashboardNavbar />

			<div className="my-8">{children}</div>
		</>
	);
}
