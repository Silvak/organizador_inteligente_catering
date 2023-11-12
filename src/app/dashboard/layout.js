import DashboardNavbar from '@/components/DashboardNavbar';

export default function Layout({ children }) {
	return (
		<div className="my-8">
			<div className="flex gap-4 bg-gradient-to-b from-red-500 via-orange-500 to-yellow-500 rounded-2xl p-8 w-4/5 m-auto mt-8 shadow-xl">
				<div className="h-20 w-20 rounded-full bg-gray-500"></div>
				<div>
					<h1 className="text-xl font-semibold text-white">Empresa</h1>
					<p className="text-base text-white">Descripción</p>
				</div>
			</div>

			<DashboardNavbar />

			<div className="w-4/5 m-auto mt-8">{children}</div>
		</div>
	);
}
