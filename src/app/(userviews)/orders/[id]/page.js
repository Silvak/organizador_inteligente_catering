'use client';

import OrderDishAccordion from '@/app/OrderDishAccordion';
import OrderMenuAccordion from '@/components/OrderMenuAccordion';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { editOrder, getOrder } from '@/services/order.services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Order({ params }) {
	const { id } = params;
	const { data: session, status } = useSession();
	const queryClient = useQueryClient();
	const router = useRouter();

	const { data: orderData, status: orderStatus } = useQuery({
		queryKey: ['orders', id],
		queryFn: () => getOrder(id),
		select: (data) => data?.data,
	});

	useEffect(() => {
		if (status != 'loading' && !session) {
			router.push('/login');
		}
	}, [status, router, session]);

	const { mutate, status: mutationStatus } = useMutation({
		mutationFn: editOrder(id),
	});

	const { toast } = useToast();

	function toggleOrderStatus() {
		const newOrderStatus =
			orderData.orderStatus === 'PAGADO' ? 'ENTREGADO' : 'PAGADO';
		mutate(
			{ orderStatus: newOrderStatus },
			{
				onSuccess: () => {
					queryClient.invalidateQueries('orders');
					toast({
						title: 'El pedido ha sido actualizado',
					});
				},
				onError: (e) => {
					console.log(e);
				},
			}
		);
	}

	return (
		<div className="space-y-8">
			<h1 className="text-2xl font-bold text-red-500">Pedido</h1>
			{orderStatus == 'pending' ? (
				<div>Cargando</div>
			) : (
				<>
					<section>
						{status == 'authenticated' &&
							session.user.user.rol === 'ENTERPRISE_ROLE' && (
								<h2 className="text-xl font-semibold text-red-500">
									{orderData?.person[0].name}
								</h2>
							)}
						{status == 'authenticated' &&
							session.user.user.rol === 'USER_ROLE' && (
								<h2 className="text-xl font-semibold text-red-500">
									{orderData?.enterprise[0].title}
								</h2>
							)}

						<p>
							<span className="font-medium">Fecha del pedido:</span>{' '}
							{new Date(orderData?.emitDate).toLocaleDateString()}
						</p>
					</section>

					<section className="flex items-center justify-between">
						<div className="text-center">
							<h3 className="font-medium text-lg">Cantidad de personas</h3>
							<p>
								{orderData?.menuDishCount > 0
									? orderData?.menuDishCount
									: orderData?.dishCount}
							</p>
						</div>
						<div className="text-center">
							<h3 className="font-medium text-lg">Fecha de entrega</h3>
							<p>{new Date(orderData?.deliverDate).toLocaleDateString()}</p>
						</div>

						{(orderData?.orderStatus == 'CANCELADO' ||
							orderData?.orderStatus == 'PENDIENTE') &&
							status == 'authenticated' &&
							session.user.user.rol === 'ENTERPRISE_ROLE' && (
								<div className="text-center">
									<h3 className="font-medium text-lg">Estado</h3>
									<p>{orderData.orderStatus}</p>
								</div>
							)}

						{status == 'authenticated' &&
							session.user.user.rol === 'ENTERPRISE_ROLE' &&
							(orderData?.orderStatus != 'CANCELADO' ||
								orderData?.orderStatus != 'PENDIENTE') && (
								<Button
									className="bg-[#F86260] hover:bg-red-500"
									onClick={toggleOrderStatus}
								>
									Marcar como{' '}
									{orderData?.orderStatus === 'PAGADO' ? 'Entregado' : 'Pagado'}
								</Button>
							)}
						{status == 'authenticated' &&
							session.user.user.rol === 'USER_ROLE' && (
								<div className="text-center">
									<h3 className="font-medium text-lg">Estado</h3>
									<p>{orderData.orderStatus}</p>
								</div>
							)}
					</section>

					{orderData?.dishes.length > 0 && (
						<section>
							<h2 className="text-xl font-semibold text-red-500">Platos</h2>
							<div>
								<OrderDishAccordion dishes={orderData?.dishes} />
							</div>
						</section>
					)}
					{orderData?.menuDishes.length > 0 && (
						<section>
							<h2 className="text-xl font-semibold text-red-500">Menus</h2>
							<div>
								<OrderMenuAccordion menus={orderData?.menuDishes} />
							</div>
						</section>
					)}
				</>
			)}
		</div>
	);
}
