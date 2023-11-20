import { getImgSrc } from '@/lib/utils';
import Image from 'next/image';

const { Card } = require('./ui/card');

export default function SelectIngredientCard({
	ingredient,
	onClick,
	selected,
}) {
	return (
		<Card
			className={`gap-2 p-1 w-full m-auto my-2 cursor-pointer shadow-md ${
				selected ? 'ring-2' : ''
			}`}
			onClick={() => onClick(ingredient)}
		>
			<p className="text-base font-semibold text-slate-900 dark:text-slate-200">
				{ingredient.title}
			</p>
		</Card>
	);
}
