'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

// Importamos los módulos (asegúrate de que las rutas coincidan)
import Header from '@/src/components/sections/Header';
import Footer from '@/src/components/sections/Footer';
import BookingSection from '@/src/components/sections/BookingSection';
import ServiceDetails from '@/src/components/sections/ServiceDetails';
import OtherServices from '@/src/components/sections/OtherServices';

export default function ServicePage() {
  const params = useParams();
  const locale = params.locale as string;
  const serviceId = params.id as string;

  const validServices = [
    'mixology', 'barman', 'glassware', 'shots', 
    'foosball', 'photobooth', 'catering', 'invitations', 'dj'
  ];

  if (!validServices.includes(serviceId)) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center text-white font-inter">
        <h1 className="text-2xl mb-4 font-playfair italic text-after-gold">Servicio no encontrado</h1>
        <Link href={`/${locale}/#services`} className="text-white/60 hover:text-white underline tracking-widest uppercase text-xs">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#080808] font-inter text-white selection:bg-after-gold selection:text-black">
      <Header />
      <ServiceDetails serviceId={serviceId} />
      <OtherServices currentServiceId={serviceId}/>
      <BookingSection />
      <Footer />

    </main>
  );
}