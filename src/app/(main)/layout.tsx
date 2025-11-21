import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow w-full mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
