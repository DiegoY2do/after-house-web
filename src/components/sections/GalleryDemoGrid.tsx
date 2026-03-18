'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GalleryDemoGrid() {
  const t = useTranslations('GalleryDemo');
  const locale = useLocale();

  // IDs que coinciden con tus carpetas en After House y que tu PHP recibirá
  const galleries = [
    { id: 'coctel', img: '1514362545857-3bc16c4c7d1b', isOffset: false },
    { id: 'boda', img: '1583939003579-730e3918a45a', isOffset: true },
    { id: 'festejos', img: '1519671482749-fd09be7ccebf', isOffset: false },
    { id: 'encuentros', img: '1511795409834-ef04bbd61622', isOffset: true }
  ];

  return (
    <section className="bg-[#080808] py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-[1300px] mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-5xl md:text-6xl text-white leading-tight"
          >
            {t('previewTitle1')} <br />
            <span className="italic text-after-gold">{t('previewTitle2')}</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {galleries.map((gal, idx) => (
            <motion.div 
              key={gal.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={`flex flex-col group ${gal.isOffset ? 'md:mt-16' : ''}`}
            >
              {/* ENLACE INTERNO A TU NUEVA PÁGINA DE GALERÍA */}
              <Link 
                href={`/${locale}/gallery?evento=${gal.id}`} 
                className="block"
              >
                <div className="aspect-[3/4] bg-[#050505] overflow-hidden relative mb-6 border border-white/5">
                  <Image 
                    src={`https://images.unsplash.com/photo-${gal.img}?q=80&w=800&auto=format&fit=crop`}
                    alt={gal.id}
                    fill
                    /* Mantenemos el ajuste: full color en móvil, grayscale en desktop */
                    className="object-cover opacity-100 grayscale-0 md:opacity-60 md:grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
              </Link>
              
              <div className="flex flex-col items-start">
                <span className="text-white/40 font-inter text-[9px] tracking-[0.4em] uppercase mb-3 font-medium">
                  {t(`tag_${gal.id}`)}
                </span>
                
                {/* BOTÓN CON NAVEGACIÓN INTERNA */}
                <Link 
                  href={`/${locale}/gallery?evento=${gal.id}`} 
                  className="group/btn inline-flex items-center text-after-gold font-inter text-[10px] tracking-[0.3em] uppercase font-bold"
                >
                  {t('btnExperiencia')}
                  <svg className="ml-2 w-3 h-3 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}