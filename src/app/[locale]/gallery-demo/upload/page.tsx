import { setRequestLocale } from 'next-intl/server';
import Header from '@/src/components/sections/Header';
import GalleryDemoUpload from '@/src/components/sections/GalleryDemoUpload'; 
import Footer from '@/src/components/sections/Footer';

export default function UploadPage({ params: { locale } }: { params: { locale: string } }) {
  // Le pasamos el idioma actual para que las traducciones funcionen
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-[#080808]">
      <Header />  
      <GalleryDemoUpload />
      <Footer />
    </main>
  );
}