'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { BadgeCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SuccessOrderDialog({ order, open }) {
	const router = useRouter();
	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				if (!open) router.push('/home');
			}}
		>
			<DialogContent className="space-y-4">
				<div className="flex flex-col justify-center items-center gap-4">
					<BadgeCheck className="text-green-600 h-20 w-20" />
					<h1 className="text-xl font-semibold">Gracias por comprar!</h1>
				</div>
				<div className="flex justify-center gap-2">
					<Button
						className="bg-[#F86260] hover:bg-red-500 rounded-md shadow-lg"
						onClick={() => router.push('/home')}
					>
						Seguir comprando
					</Button>
					<Button
						className="border-[#F86260] hover:border-red-500 text-red-500 hover:text-red-600 rounded-md shadow-lg"
						variant="outline"
						onClick={() => router.push(`/orders/${order._id}`)}
					>
						Ver Orden
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
