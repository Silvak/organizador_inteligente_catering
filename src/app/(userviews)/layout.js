import Footer from "@/components/Footer";
import Sidebar from "@/components/navigation/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido de la página */}
      <div className="flex-grow flex flex-col z-20">{children}</div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
