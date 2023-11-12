import Footer from '@/components/Footer';
import Sidebar from '@/components/navigation/Sidebar';

export default function Layout({ children }) {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="flex">
				<Sidebar />

				{/* Contenido de la página */}
				<div className="flex-grow">
					<div className="w-4/5 m-auto my-4">{children}</div>
				</div>
			</div>
			{/* Sidebar */}

			{/* Footer */}
			<Footer />
		</div>
	);
}
