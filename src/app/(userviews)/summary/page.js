'use client';

import SuccessOrderDialog from '@/app/SuccessOrderDialog';
import { useCartStore } from '@/app/cartStore';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { createOrder } from '@/services/order.services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, Mail, MapPin, Phone, User } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const summarySchema = z.object({
	people: z.coerce.number().min(1),
	email: z.string().email(),
	name: z.string(),
	phone: z.string().min(10),
	address: z.string(),
	shippingDate: z.date({
		required_error: 'La fecha de entrega es requerida.',
	}),
});

export default function Summary() {
	const { data: session, status: sessionStatus } = useSession();

	const form = useForm({
		resolver: zodResolver(summarySchema),
		defaultValues: {
			people: 1,
			email: '',
			name: '',
			phone: '',
			address: '',
			date: '',
		},
	});

	const { mutate, status } = useMutation({
		mutationFn: createOrder,
	});

	const [order, setOrder] = useState(null);
	const [open, setOpen] = useState(false);

	const dishes = useCartStore((state) => state.dishes);
	const menus = useCartStore((state) => state.menus);
	const enterprise = useCartStore((state) => state.enterprise);
	const totalDishes = dishes.reduce((acc, dish) => acc + dish.price, 0);
	const totalMenus = menus.reduce(
		(acc, menu) => acc + menu.dishes.reduce((a, dish) => a + dish.price, 0),
		0
	);

	function onSubmit(data) {
		mutate(
			{
				dishes: dishes.map((dish) => dish._id),
				menuDishes: menus.map((menu) => menu._id),
				person: session?.user?.user.person[0],
				menuDishCount: menus.length > 0 ? data.people : 0,
				dishCount: dishes.length > 0 ? data.people : 0,
				emitDate: new Date().toISOString(),
				deliverDate: data.shippingDate.toISOString(),
				address: data.address,
				enterprise,
				orderStatus: 'PAGADO',
				totalCost: totalDishes + totalMenus,
				observations: 'observaciones',
			},
			{
				onSuccess: (data) => {
					setOrder(data?.data);
					setOpen(true);
				},
				onError: (error) => {
					console.log(error);
				},
			}
		);
	}

	return (
		<div className="space-y-8">
			<h1 className="text-2xl font-bold text-red-500">Resumen de orden</h1>
			<SuccessOrderDialog order={order} open={open} />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex items-start gap-8">
						<Card className="p-4 w-3/5 rounded-2xl shadow-lg space-y-8">
							<FormField
								control={form.control}
								name="people"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold text-gray-600 text-base">
											Personas
										</FormLabel>
										<FormControl>
											<div className="flex items-center">
												<Input
													placeholder="Establezca número de personas"
													type="text"
													className="bg-white dark:bg-blue-200/10 border-x-0 border-t-0 border-b-1 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 pl-8"
													{...field}
												/>
												<User className="text-gray-400 absolute" />
											</div>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="displayName"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold text-gray-600 text-base">
											Nombre de usuario
										</FormLabel>
										<FormControl>
											<div className="flex items-center">
												<Input
													placeholder="Establezca su nombre de usuario"
													type="text"
													className="bg-white dark:bg-blue-200/10 border-x-0 border-t-0 border-b-1 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 pl-8"
													{...field}
												/>
												<User className="text-gray-400 absolute" />
											</div>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold text-gray-600 text-base">
											Correo Electrónico
										</FormLabel>
										<FormControl>
											<div className="flex items-center">
												<Input
													placeholder="Establezca su dirección de correo electrónico"
													type="email"
													className="bg-white dark:bg-blue-200/10 border-x-0 border-t-0 border-b-1 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 pl-8"
													{...field}
												/>
												<Mail className="text-gray-400 absolute" />
											</div>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold text-gray-600 text-base">
											Numero de Teléfono
										</FormLabel>
										<FormControl>
											<div className="flex items-center">
												<Input
													placeholder="Establezca su numero de teléfono"
													type="text"
													className="bg-white dark:bg-blue-200/10 border-x-0 border-t-0 border-b-1 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 pl-8"
													{...field}
												/>
												<Phone className="text-gray-400 absolute" />
											</div>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold text-gray-600 text-base">
											Dirección
										</FormLabel>
										<FormControl>
											<div className="flex items-center">
												<Input
													placeholder="Establezca su nombre de usuario"
													type="text"
													className="bg-white dark:bg-blue-200/10 border-x-0 border-t-0 border-b-1 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 pl-8"
													{...field}
												/>
												<MapPin className="text-gray-400 absolute" />
											</div>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="shippingDate"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel className="font-semibold text-gray-600 text-base">
											Fecha de entrega
										</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={'outline'}
														className="bg-white dark:bg-blue-200/10 border-x-0 border-t-0 border-b-1 border-gray-300 rounded-none focus-visible:ring-0 focus-visible:border-b-2 flex justify-start px-0 gap-2 text-gray-400"
													>
														<CalendarIcon className=" text-gray-400" />
														{field.value ? (
															format(field.value, 'PPP', {
																locale: es,
															})
														) : (
															<span className="text-sm text-gray-500 font-normal">
																Selecciona fecha
															</span>
														)}
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) => date < new Date()}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						</Card>

						<Card className="p-4 w-2/5 rounded-2xl shadow-lg space-y-4 mt-0">
							<h2 className="text-lg font-bold text-red-500">Tu orden</h2>
							<section className="space-y-2 text-sm text-gray-600">
								{dishes.map((dish) => (
									<div
										key={dish.id}
										className="flex items-center justify-between"
									>
										<p>{dish.title}</p>
										<p>${dish.price}</p>
									</div>
								))}
								{menus.map((menu) => (
									<div
										key={menu.id}
										className="flex items-center justify-between"
									>
										<p>{menu.name}</p>
										<p>
											${menu.dishes.reduce((acc, dish) => acc + dish.price, 0)}
										</p>
									</div>
								))}
							</section>
							<section className="flex items-center justify-between pt-2 border-gray-600 border-t text-base">
								<p>Total</p>
								<p>${totalDishes + totalMenus}</p>
							</section>

							<Button className="w-full bg-red-500">Continuar</Button>
						</Card>
					</div>
				</form>
			</Form>
		</div>
	);
}
