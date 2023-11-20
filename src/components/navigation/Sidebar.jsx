'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
	Home,
	LayoutDashboard,
	LogOut,
	ShoppingCart,
	User,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
	getEnterprise,
	getPerson,
	uploadCompanyImage,
	uploadPersonImage,
} from '@/services/user.services';
import { getImgSrc } from '@/lib/utils';
import { useToast } from '../ui/use-toast';
import { Skeleton } from '../ui/skeleton';
import { Input } from '../ui/input';
import { useState } from 'react';

export default function Sidebar() {
	const [userImage, setUserImage] = useState(null);
	const { data: session, status } = useSession();

	const { data: personData, status: personStatus } = useQuery({
		queryKey: ['person', session?.user?.user.person[0]],
		queryFn: getPerson(session?.user?.user.person[0]),
		select: (data) => data.data,
		enabled: !!session?.user?.user.person[0],
	});

	const { data: companyData, status: companyStatus } = useQuery({
		queryKey: ['company', session?.user?.user.enterprise[0]],
		queryFn: getEnterprise(session?.user?.user.enterprise[0]),
		enabled: !!session?.user?.user.enterprise[0],
		select: (data) => data?.data,
	});

	const { toast } = useToast();

	const handleLogout = () => {
		signOut();
		toast({ title: 'Sesión cerrada' });
	};

	const queryClient = useQueryClient();

	async function changeCompanyImageProfile(userImage) {
		try {
			const formData = new FormData();
			formData.append('image', userImage, userImage.name);
			await uploadCompanyImage(companyData._id, formData);
			queryClient.invalidateQueries(['person']);
			toast({ title: 'Foto de perfil actualizada' });
		} catch (e) {
			console.log(e);
			toast({
				title: 'Error al subir la imagen',
				variant: 'destructive',
			});
		}
	}

	async function changeUserImageProfile(userImage) {
		try {
			const formData = new FormData();
			formData.append('image', userImage, userImage.name);
			await uploadPersonImage(personData._id, formData);
			queryClient.invalidateQueries(['person']);
			toast({ title: 'Foto de perfil actualizada' });
		} catch (e) {
			console.log(e);
			toast({
				title: 'Error al subir la imagen',
				variant: 'destructive',
			});
		}
	}

	return (
		<nav className="h-[76vh] w-64 bg-[#F86260] shadow-lg overflow-y-auto rounded-tr-lg rounded-br-lg flex flex-col justify-between">
			<div>
				<div>
					<div className="flex flex-col items-start overflow-y-auto pl-4 pt-6">
						{((session?.user?.user?.rol == 'USER_ROLE' &&
							personStatus == 'pending') ||
							(session?.user?.user?.rol == 'ENTERPRISE_ROLE' &&
								companyStatus == 'pending')) && (
							<div className="flex gap-2 items-center w-3/4">
								<Skeleton className="rounded-full h-16 w-16 bg-gray-300" />
								<div className="space-y-4 flex-grow">
									<Skeleton className="h-3 w-full bg-gray-300" />
									<Skeleton className="h-3 w-full bg-gray-300" />
								</div>
							</div>
						)}
						{companyStatus == 'success' &&
							session?.user?.user?.rol == 'ENTERPRISE_ROLE' && (
								<div className="flex items-center mb-4">
									<label htmlFor="userProfileImage" className="cursor-pointer">
										<Avatar className="cursor-pointer mr-4 w-16 h-16">
											<AvatarImage
												src={getImgSrc('enterprise', companyData?.img)}
											/>

											<AvatarFallback>
												<User className="h-10 w-10" />
											</AvatarFallback>
										</Avatar>
									</label>

									<Input
										type="file"
										className="bg-gray-200 hidden"
										onChange={(e) => {
											if (e.target.files) {
												if (e.target.files[0]) {
													setUserImage(e.target.files[0]);
													changeCompanyImageProfile(e.target.files[0]);
												} else {
													setUserImage(null);
												}
											}
										}}
										name="userProfileImage"
										value={userImage?.filename}
										id="userProfileImage"
									/>
									<div>
										<p className="text-white">{companyData?.title}</p>
									</div>
								</div>
							)}
						{personStatus == 'success' &&
							session?.user?.user?.rol == 'USER_ROLE' && (
								<div className="flex items-center mb-4">
									<label htmlFor="userProfileImage" className="cursor-pointer">
										<Avatar className="cursor-pointer mr-4 w-16 h-16">
											<AvatarImage src={getImgSrc('person', personData?.img)} />

											<AvatarFallback>
												<User className="h-10 w-10" />
											</AvatarFallback>
										</Avatar>
									</label>

									<Input
										type="file"
										className="bg-gray-200 hidden"
										onChange={(e) => {
											if (e.target.files) {
												if (e.target.files[0]) {
													setUserImage(e.target.files[0]);
													changeUserImageProfile(e.target.files[0]);
												} else {
													setUserImage(null);
												}
											}
										}}
										name="userProfileImage"
										value={userImage?.filename}
										id="userProfileImage"
									/>

									<div>
										<p className="text-white">{personData?.name}</p>
									</div>
								</div>
							)}

						{status == 'authenticated' &&
							session?.user?.user?.rol == 'ADMIN_ROLE' && (
								<div className="flex items-center mb-4">
									<Avatar className="cursor-pointer mr-4 w-16 h-16">
										<AvatarFallback>
											<User className="h-10 w-10" />
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="text-white">Admin</p>
									</div>
								</div>
							)}

						<ul className="flex flex-col mt-4 cursor-pointer">
							{status == 'authenticated' &&
								session?.user?.user?.rol == 'USER_ROLE' && (
									<>
										<Link
											href="/home"
											className="flex items-center text-white p-2 gap-2"
										>
											<Home />
											Home
										</Link>

										<Link
											href="/profile/orders/pending"
											className="flex items-center text-white p-2 gap-2"
										>
											<User />
											Profile
										</Link>

										<Link
											href="/cart"
											className="flex items-center text-white p-2 gap-2"
										>
											<ShoppingCart />
											Carrito
										</Link>
									</>
								)}

							{status == 'authenticated' &&
								session?.user?.user?.rol == 'ENTERPRISE_ROLE' && (
									<Link
										href="/dashboard/dishes"
										className="flex items-center text-white p-2 gap-2"
									>
										<LayoutDashboard />
										Dashboard
									</Link>
								)}
						</ul>
					</div>
				</div>
			</div>

			{status == 'authenticated' && (
				<div className="flex flex-col mt-auto p-4">
					<Button
						onClick={handleLogout}
						className="text-white p-2 text-base font-semibold rounded cursor-pointer flex gap-2 items-center"
						variant="ghost"
					>
						<LogOut />
						Log Out
					</Button>
				</div>
			)}
		</nav>
	);
}
