import ProfileHeader from '@/components/ProfileHeader';
import ProfileNavbar from '@/components/ProfileNavbar';

export default function Layout({ children }) {
	return (
		<>
			<ProfileHeader />

			<ProfileNavbar />

			<div className="my-8">{children}</div>
		</>
	);
}
