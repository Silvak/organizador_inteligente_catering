import AdminNavbar from '@/components/AdminNavbar';

export default function Layout({ children }) {
	return (
		<>
			<AdminNavbar />

			<div className="my-8">{children}</div>
		</>
	);
}
