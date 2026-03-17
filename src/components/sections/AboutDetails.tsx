'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutDetails() {
  const t = useTranslations('AboutDetails');
  const tGlobals = useTranslations('Globals');
  const locale = useLocale();

  const safeT = (path: string) => {
    try {
      const val = t(path as any);
      return val.includes(path) ? '' : val;
    } catch { return ''; }
  };

  const storyString = safeT('storyText');
  const storyParagraphs = storyString ? storyString.split('\n').filter(p => p.trim() !== '') : [];

  return (
    <div className="bg-[#080808] text-white font-inter selection:bg-after-gold selection:text-black min-h-screen pb-24 md:pb-32">
      
      {/* 1. HERO INMERSIVO */}
      <section className="relative w-full h-[65vh] lg:h-[80vh] flex flex-col items-center justify-end pb-20 lg:pb-28 overflow-hidden mb-16 lg:mb-24">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Usa una foto de tu equipo, tu barra o un evento real */}
          <Image 
            src="/images/cocktails/bg.jpg" 
            alt="After House History"
            fill
            className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-[3s]"
            priority
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/10 via-[#080808]/60 to-[#080808]" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          {/* Cápsula de Breadcrumb (Bordes redondeados) */}
          <div className="flex items-center justify-center px-6 py-2.5 rounded-full border border-white/20 bg-[#080808]/40 backdrop-blur-md mb-8 lg:mb-10 shadow-2xl">
            <span className="text-after-gold text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] uppercase font-light">
              {safeT('breadcrumb') || 'Nuestra Historia'}
            </span>
          </div>

          <h1 className="font-playfair text-6xl md:text-8xl lg:text-[7.5rem] text-white italic leading-none drop-shadow-2xl">
            {safeT('title') || 'Nosotros'}
          </h1>
        </motion.div>
      </section>

      {/* 2. EL CONTENIDO: LA FILOSOFÍA */}
      <section className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-10 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Columna Izquierda: Título y Frase */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:sticky lg:top-40"
          >
            <div className="border-l border-after-gold pl-4 mb-8">
              <span className="text-after-gold text-sm tracking-[0.2em] uppercase font-medium">
                {safeT('subtitleLabel') || 'FILOSOFÍA'}
              </span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-white italic leading-tight">
              {safeT('subtitle') || 'No servimos bebidas, creamos atmósferas.'}
            </h2>
          </motion.div>

          {/* Columna Derecha: Narrativa */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8 lg:pl-12 lg:border-l lg:border-white/5"
          >
            <div className="space-y-6 text-white/80 font-inter text-base md:text-lg leading-[1.8] text-justify md:text-left font-light">
              {storyParagraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-12 border-t border-white/10 mt-12">
              <h3 className="text-after-gold text-[10px] tracking-[0.4em] uppercase font-semibold mb-6">
                {safeT('visionTitle') || 'EL ESTÁNDAR AFTER HOUSE'}
              </h3>
              <p className="text-white/60 font-light leading-relaxed text-base md:text-lg italic font-playfair">
                "{safeT('visionText') || 'La hospitalidad de lujo no se trata de impresionar, se trata de hacer que las personas se sientan genuinamente especiales.'}"
              </p>
            </div>

            {/* BOTÓN CTA DIRECTO A WHATSAPP (Bordes rectos) */}
            <div className="pt-12">
              <a 
                href={tGlobals('social.whatsapp')} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex justify-center items-center px-10 md:px-12 py-4 md:py-5 border border-after-gold bg-transparent overflow-hidden transition-all duration-700 w-fit"
              >
                <span className="absolute inset-0 bg-after-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
                <span className="relative z-10 font-inter text-after-gold group-hover:text-black text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-medium transition-colors duration-500 whitespace-nowrap">
                  {safeT('ctaButton') || 'Cotizar Evento'}
                </span>
              </a>
            </div>

          </motion.div>

        </div>
      </section>

    </div>
  );
}