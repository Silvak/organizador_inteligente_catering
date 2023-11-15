import { Skeleton } from './ui/skeleton';

function ProductsSkeletons() {
	return (
		<>
			<div className="flex flex-col items-center space-y-6">
				<Skeleton className="h-28 w-28 rounded-full bg-gray-300" />
				<div className="space-y-4 w-full">
					<Skeleton className="h-5 w-full  bg-gray-300" />
					<Skeleton className="h-5 w-full  bg-gray-300" />
					<Skeleton className="h-5 w-full  bg-gray-300" />
				</div>
			</div>
			<div className="flex flex-col items-center space-y-6">
				<Skeleton className="h-28 w-28 rounded-full bg-gray-300" />
				<div className="space-y-4 w-full">
					<Skeleton className="h-5 w-full  bg-gray-300" />
					<Skeleton className="h-5 w-full  bg-gray-300" />
					<Skeleton className="h-5 w-full  bg-gray-300" />
				</div>
			</div>
			<div className="flex flex-col items-center space-y-6">
				<Skeleton className="h-28 w-28 rounded-full bg-gray-300" />
				<div className="space-y-4 w-full">
					<Skeleton className="h-5 w-full  bg-gray-300" />
					<Skeleton className="h-5 w-full  bg-gray-300" />
					<Skeleton className="h-5 w-full  bg-gray-300" />
				</div>
			</div>
		</>
	);
}

export default ProductsSkeletons;
