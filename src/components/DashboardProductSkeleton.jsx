import { Skeleton } from './ui/skeleton';

export default function DashboardProductSkeleton() {
	return (
		<div className="space-y-6">
			<div className="flex items-center space-x-6">
				<Skeleton className="h-28 w-28 rounded-full bg-gray-300" />
				<div className="space-y-4 w-full">
					<Skeleton className="h-5 w-full  bg-gray-300" />
					<Skeleton className="h-5 w-full  bg-gray-300" />
					<Skeleton className="h-5 w-full  bg-gray-300" />
				</div>
			</div>
			<div className="flex items-center space-x-6">
				<Skeleton className="h-28 w-28 rounded-full bg-gray-300" />
				<div className="space-y-4 w-full">
					<Skeleton className="h-5 w-full  bg-gray-300" />
					<Skeleton className="h-5 w-full  bg-gray-300" />
					<Skeleton className="h-5 w-full  bg-gray-300" />
				</div>
			</div>
			<div className="flex items-center space-x-6">
				<Skeleton className="h-28 w-28 rounded-full bg-gray-300" />
				<div className="space-y-4 w-full">
					<Skeleton className="h-5 w-full  bg-gray-300" />
					<Skeleton className="h-5 w-full  bg-gray-300" />
					<Skeleton className="h-5 w-full  bg-gray-300" />
				</div>
			</div>
		</div>
	);
}
