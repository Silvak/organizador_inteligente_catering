import { Button } from '@/components/ui/button';
import DishCard from '@/components/DishCard';
import MenuCard from '@/components/MenuCard';

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-8 p-12">
			<h1 className="text-6xl font-bold text-center">Home</h1>
			<Button variant="outline">Button</Button>
		</main>
	);
}
