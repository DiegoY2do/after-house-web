'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function OtherServices({ currentServiceId }: { currentServiceId: string }) {
  const t = useTranslations('Services');
  const locale = useLocale();

  const allServices = [
    'mixology', 'barman', 'glassware', 'shots', 
    'foosball', 'photobooth', 'catering', 'invitations', 'dj'
  ];

  const currentIndex = allServices.indexOf(currentServiceId);
  const suggestedServices = [];
  for (let i = 1; i <= 3; i++) {
    suggestedServices.push(allServices[(currentIndex + i) % allServices.length]);
  }

  const safeT = (path: string) => {
    try {
      const val = t(path as any);
      return val.includes(path) ? '' : val;
    } catch {
      return '';
    }
  };

  return (
    <section className="w-full bg-[#080808] pb-32 pt-24 font-inter overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        {/* ENCABEZADO */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 lg:mb-20 flex justify-center w-full"
        >
          {/* BADGE EXACTO PREMIUM */}
          <div className="w-fit flex items-center justify-center px-6 py-2.5 lg:px-10 lg:py-3 rounded-[30px] border border-after-gold/20 bg-after-black/60 backdrop-blur-2xl text-after-gold text-[9px] md:text-[10px] lg:text-[12px] tracking-[0.2em] lg:tracking-[0.7em] uppercase font-light text-center leading-normal max-w-[90vw]">
            {safeT('otherServicesSubtitle')}
          </div>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="font-playfair text-5xl md:text-6xl lg:text-7xl text-white italic leading-tight mb-20 md:mb-32 text-center"
        >
          Descubre más
        </motion.h2>

        {/* GRID ASIMÉTRICO (CASCADA EDITORIAL) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 w-full items-start">
          {suggestedServices.map((id, index) => (
            <Link 
              key={id}
              href={`/${locale}/services/${id}`}
              className={`group flex flex-col items-center w-full cursor-pointer ${
                index === 1 ? 'md:mt-24' : '' // Aquí creamos la asimetría bajando el elemento central
              }`}
            >
              {/* Imagen (Más vertical y sin texto encima) */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative w-full aspect-[3/4] lg:aspect-[2/3] overflow-hidden bg-[#050505] rounded-sm"
              >
                <Image 
                  src={`/images/services/${id}.jpg`}
                  alt={safeT(`${id}.title`)}
                  fill
                  className="object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2s] ease-out group-hover:scale-105"
                />
              </motion.div>
              
              {/* Textos y Acciones debajo de la imagen */}
              <div className="mt-8 flex flex-col items-center text-center">
                <h3 className="font-playfair text-2xl lg:text-3xl text-white/90 group-hover:text-after-gold transition-colors duration-500 italic mb-4">
                  {safeT(`${id}.title`)}
                </h3>
                
                {/* Línea animada y texto de acción */}
                <div className="flex items-center gap-4 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="w-8 h-[1px] bg-after-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                  <span className="font-inter text-after-gold text-[9px] tracking-[0.4em] uppercase font-medium">
                    {safeT('viewService')}
                  </span>
                  <span className="w-8 h-[1px] bg-after-gold origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}