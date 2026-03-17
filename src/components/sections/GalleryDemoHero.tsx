'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GalleryDemoHero() {
  const t = useTranslations('GalleryDemo');
  const locale = useLocale();

  const safeT = (path: string) => {
    try {
      const val = t(path as any);
      return val.includes(path) ? '' : val;
    } catch { return ''; }
  };

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden bg-[#080808]">
      {/* 1. Fondo con escala animada */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <Image 
          src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=2062&auto=format&fit=crop" 
          alt="After House Gallery"
          fill
          className="object-cover grayscale brightness-[0.4] hover:grayscale-0 transition-all duration-[3s] ease-out"
          priority
        />
        {/* Degradado para fundir con el negro sólido inferior */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080808]/40 to-[#080808]" />
      </motion.div>

      {/* 2. Composición de Título y Breadcrumb (Misma estructura que Detalles) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pt-20">
        
        {/* Breadcrumb estilo cápsula cristal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-block border border-after-gold/30 bg-[#080808]/80 backdrop-blur-md text-after-gold text-[9px] md:text-[10px] tracking-[0.6em] uppercase font-light px-8 py-2.5 rounded-full shadow-2xl">
            {safeT('breadcrumb') || 'FOTOGRAFÍA Y DISEÑO'}
          </span>
        </motion.div>
        
        {/* Título Monumental */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-playfair text-6xl md:text-8xl lg:text-[10rem] text-white italic leading-none drop-shadow-2xl mb-8"
        >
          {safeT('heroTitle1')} <br className="hidden md:block" />
          <span className="text-after-gold">{safeT('heroTitle2')}</span>
        </motion.h1>

        {/* Descripción refinada */}
        <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.6 }}
           className="text-white/40 font-inter font-light text-sm md:text-base max-w-xl leading-relaxed tracking-wide mb-10"
        >
          {safeT('heroDesc')}
        </motion.p>

        {/* Botón consistente */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link 
            href={`/${locale}/gallery-demo#preview`} 
            className="group relative inline-flex justify-center items-center px-12 py-4 border border-after-gold/40 bg-transparent overflow-hidden transition-all duration-700 hover:border-after-gold"
          >
            <span className="absolute inset-0 bg-after-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
            <span className="relative z-10 font-inter text-after-gold group-hover:text-black text-[10px] tracking-[0.4em] uppercase font-medium transition-colors duration-500">
              {safeT('heroBtn') || 'VER GALERÍA'}
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}