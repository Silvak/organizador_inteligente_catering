import CreateDishDialog from '@/components/CreateDishDialog';
import CreateMenuDialog from '@/components/CreateMenuDialog';
import DashboardDishCard from '@/components/DashboardDishCard';
import DashboardMenuCard from '@/components/DashboardMenuCard';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Eye, Trash } from 'lucide-react';

const dishes = [
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
	{
		id: '3',
		name: 'Sushi',
		description: 'Arroz con cerdo empanizado',
		price: 120,
		image: '/images/katsudon.jpg',
		category: 'Japonesa',
		company: 'Sushi Itto',
		ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
	},
];

const menus = [
	{
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
			{
				id: '3',
				name: 'Sushi',
				description: 'Arroz con cerdo empanizado',
				price: 120,
				image: '/images/katsudon.jpg',
				category: 'Japonesa',
				company: 'Sushi Itto',
				ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
			},
		],
	},
	{
		id: '2',
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
			{
				id: '3',
				name: 'Sushi',
				description: 'Arroz con cerdo empanizado',
				price: 120,
				image: '/images/katsudon.jpg',
				category: 'Japonesa',
				company: 'Sushi Itto',
				ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
			},
		],
	},
	{
		id: '3',
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
			{
				id: '3',
				name: 'Sushi',
				description: 'Arroz con cerdo empanizado',
				price: 120,
				image: '/images/katsudon.jpg',
				category: 'Japonesa',
				company: 'Sushi Itto',
				ingredients: ['Arroz', 'Cerdo', 'Huevo', 'Cebolla', 'Panko'],
			},
		],
	},
];

export default function Page() {
	return (
		<div className="space-y-8">
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">Platos</h2>
					<CreateDishDialog />
				</div>
				{dishes.map((dish) => (
					<DashboardDishCard key={dish.id} dish={dish} />
				))}
			</div>

			<div className="space-y-4">
				<div className="flex items-center justify-between mt-8">
					<h2 className="text-xl font-semibold">Menus</h2>
					<CreateMenuDialog />
				</div>
				{menus.map((menu) => (
					<DashboardMenuCard key={menu.id} menu={menu} />
				))}
			</div>
		</div>
	);
}
