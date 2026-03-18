import Header from '@/src/components/sections/Header';
import Footer from '@/src/components/sections/Footer';
import GalleryEventView from '@/src/components/sections/GalleryEventView';

export default function GalleryPage() {
  return (
    <main className="relative min-h-screen bg-[#080808] font-inter text-white">
      <Header />
      <GalleryEventView />
      <Footer />
    </main>
  );
}