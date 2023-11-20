import DashboardHeader from '@/components/DashboardHeader';
import DashboardNavbar from '@/components/DashboardNavbar';

export default function Layout({ children }) {
	return (
		<>
			<DashboardHeader />

			<DashboardNavbar />

			<div className="my-8">{children}</div>
		</>
	);
}
