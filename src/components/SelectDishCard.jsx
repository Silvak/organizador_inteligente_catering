import { getImgSrc } from '@/lib/utils';
import Image from 'next/image';

const { Card } = require('./ui/card');

export default function SelectDishCard({ dish, onClick, selected }) {
	return (
		<Card
			className={`flex gap-2 p-1 w-full  cursor-pointer shadow-lg ${
				selected ? 'ring-2' : ''
			}`}
			onClick={() => onClick(dish)}
		>
			<Image
				alt={dish.title}
				src={getImgSrc('dish', dish.img)}
				className="w-20 max-h-20 rounded-lg object-center object-contain h-fit"
				width={80}
				height={80}
			/>

			<div className="space-y-1">
				<p className="text-base font-semibold text-slate-900 dark:text-slate-200">
					{dish.title}
				</p>
				<p className="text-sm font-medium text-slate-800 dark:text-slate-200">
					{dish.description}
				</p>
			</div>
		</Card>
	);
}
