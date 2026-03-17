import Header from '@/src/components/sections/Header';
import GalleryDemoHero from '@/src/components/sections/GalleryDemoHero';
import GalleryDemoProcess from '@/src/components/sections/GalleryDemoProcess';
import Footer from '@/src/components/sections/Footer';

export default function GalleryDemoPage() {
  return (
    <main className="relative min-h-screen bg-[#080808] font-inter text-white selection:bg-after-gold selection:text-black">
      <Header />  
      <GalleryDemoHero />
      <GalleryDemoProcess />
      <Footer />
    </main>
  );
}