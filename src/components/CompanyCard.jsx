'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CompanyCard({ company }) {
	const router = useRouter();
	return (
		<article
			className="flex flex-col items-center space-y-2 cursor-pointer"
			onClick={() => router.push(`/company/${company._id}`)}
		>
			<Image
				src={company.image}
				alt={company.name}
				width={100}
				height={100}
				className="rounded-full border"
			/>
			<h1 className="text-xl font-semibold">{company.name}</h1>
			<p className="text-gray-600">{company.description}</p>
		</article>
	);
}
