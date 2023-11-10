import { Button } from '@/components/ui/button';
import DishCard from '@/components/DishCard';
import MenuCard from '@/components/MenuCard';

const dish = {
	id: '1',
	name: 'Katsudon',
	description: 'Arroz con cerdo empanizado',
	price: 120,
	image: '/images/katsudon.jpg',
	category: 'Japonesa',
	company: 'Sushi Itto',
	ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
};

const menu = {
	id: '1',
	name: 'Sushi Itto',
	description: 'Sushi, Japonesa',
	image: '/images/katsudon.jpg',
	company: 'Sushi Itto',
	dishes: [
		{
			id: '1',
			name: 'Katsudon',
			description: 'Arroz con cerdo empanizado',
			price: 120,
			image: '/images/katsudon.jpg',
			category: 'Japonesa',
			company: 'Sushi Itto',
			ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
		},
		{
			id: '2',
			name: 'Sushi',
			description: 'Arroz con cerdo empanizado',
			price: 120,
			image: '/images/katsudon.jpg',
			category: 'Japonesa',
			company: 'Sushi Itto',
			ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
		},
	],
};

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-8 p-12">
			<h1 className="text-6xl font-bold text-center">Home</h1>
			<Button variant="outline">Button</Button>
			<div className="m-4">
				<DishCard dish={dish} />
				<MenuCard menu={menu} />
			</div>
		</main>
	);
}
