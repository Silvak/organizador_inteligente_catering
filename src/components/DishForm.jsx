import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';

import { Input } from './ui/input';

export default function DishForm({ form }) {
	return (
		<>
			<FormField
				control={form.control}
				name="title"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="font-semibold">Nombre</FormLabel>
						<FormControl>
							<Input
								type="text"
								className="border-none focus-visible:ring-1 rounded-xl h-fit p-2"
								placeholder="Nombre"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="description"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="font-semibold">Descripción</FormLabel>
						<FormControl>
							<Input
								type="text"
								className="border-none focus-visible:ring-1 rounded-xl h-fit p-2"
								placeholder="Description"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name="price"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="font-semibold">Precio</FormLabel>
						<FormControl>
							<Input
								type="number"
								className="border-none focus-visible:ring-1 rounded-xl h-fit p-2"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</>
	);
}
