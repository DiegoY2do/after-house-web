import Header from '@/src/components/sections/Header';
import GalleryDemoGrid from '@/src/components/sections/GalleryDemoGrid';
import GalleryDemoInvite from '@/src/components/sections/GalleryDemoInvite';
import Footer from '@/src/components/sections/Footer';

export default function GalleryDemoPage() {
  return (
    <main className="relative min-h-screen bg-[#080808] font-inter text-white">
      <Header />
      
      {/* Padding superior para no quedar debajo del Header */}
      <div className="pt-32">
        <GalleryDemoGrid />
        <GalleryDemoInvite />
      </div>

      <Footer />
    </main>
  );
}