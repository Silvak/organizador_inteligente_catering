import DashboardDishesSection from '@/components/DashboardDishesSection';
import DashboardMenusSection from '@/components/DashboardMenusSection';

export default function Page() {
	return (
		<div className="space-y-8">
			<DashboardDishesSection />

			<DashboardMenusSection />
		</div>
	);
}
